## Page Builder Product Card Backend Contract

This document defines the HTML embedding contract that the Page Builder consumes to render product cards with variations and support “Add to Cart” directly from static HTML.

### Goals
- Backend embeds all necessary product data within HTML using `data-*` attributes.
- Frontend extracts these `data-*` attributes to:
  - Render variation options (e.g., Weight, Color)
  - Validate selections and availability
  - Resolve the concrete variant (no extra API call required)
  - Add the selected item to cart

---

## 1) Product Card HTML Structure

Embed a JSON payload in `data-product` on the card container. Use single quotes on the attribute and JSON keys with double quotes to stay HTML-safe.

```html
<div
  class="product-card-inner ..."
  data-product='{
    "id": 765,
    "slug": "mango",
    "name": "Mango",
    "thumbnail": "https://cdn.example.com/.../product-6-thumb.webp",
    "has_variation": true,
    "default_variation_id": 12001,

    "pricing": {
      "currency": "USD",
      "current": 127.50,
      "compareAt": 150.00,
      "discountPercent": 15
    },

    "variations": [
      {
        "id": 1,
        "name": "Weight",
        "type": "text",
        "values": [
          { "id": 1, "value": "1 KG", "disabled": false },
          { "id": 2, "value": "2 KG", "disabled": false },
          { "id": 3, "value": "3 KG", "disabled": false }
        ]
      },
      {
        "id": 2,
        "name": "Color",
        "type": "color",
        "values": [
          { "id": 4, "value": "Red", "hex": "#FF0000", "disabled": false },
          { "id": 5, "value": "Yellow", "hex": "#FFFF00", "disabled": false },
          { "id": 6, "value": "Green", "hex": "#008000", "disabled": false }
        ]
      }
    ],

    "defaultSelection": { "1": 1, "2": 4 },

    "variantMap": {
      "1:1|2:4": { "variantId": 12001, "inStock": true,  "stockQty": 12, "price": 127.50, "compareAt": 150.00 },
      "1:2|2:4": { "variantId": 12002, "inStock": false, "stockQty": 0,  "price": 240.00, "compareAt": null },
      "1:1|2:5": { "variantId": 12003, "inStock": true,  "stockQty": 4,  "price": 127.50, "compareAt": 150.00 }
    }
  }'
>
  <!-- Card inner HTML ... -->
</div>
```

Notes:
- `variantMap` keys are a stable concatenation of `attributeId:valueId` pairs, sorted by `attributeId`, joined with `|` (e.g., `"1:1|2:4"`). This allows O(1) lookup on the client.
- `values[].disabled` can be precomputed by the backend based on inventory to gray out impossible options.
- `defaultSelection` ensures a valid initial state.

---

## 2) Variation Option Buttons

Each rendered option button must include `data-attribute-id` and `data-value-id`. Color options can include `data-color`.

```html
<!-- Text/Size example (Weight) -->
<button
  class="size-option"
  data-attribute-id="1"
  data-value-id="1"
  data-value="1 KG"
  aria-label="Select Weight: 1 KG"
>
  1 KG
  </button>

<!-- Color example -->
<button
  class="color-option"
  style="background-color: #FF0000;"
  data-attribute-id="2"
  data-value-id="4"
  data-color="#FF0000"
  title="Red"
  aria-label="Select Color: Red"
>
  <span class="sr-only">Red</span>
</button>
```

The frontend toggles a CSS class like `active` on the selected option. The Page Builder then reads selected buttons within the same card.

---

## 3) Add to Cart Button

Keep your existing button markup; ensure it sits inside the same card (descendant of the element with `data-product`).

```html
<button class="w-full te-btn te-btn-primary">Add to Cart</button>
```

When clicked, the Page Builder will:
1. Find the nearest ancestor with `data-product`.
2. Parse the JSON payload.
3. Read selected options (`.size-option.active`, `.color-option.active`, etc.).
4. Build the selection key (e.g., `1:1|2:4`).
5. Resolve to `variantId` using `variantMap`.
6. Post to the Add-to-Cart API with `productId`, `variantId` (or `default_variation_id`), and `qty`.

---

## 4) Minimal JSON Schema (for `data-product`)

```json
{
  "id": 765,
  "slug": "mango",
  "name": "Mango",
  "thumbnail": "https://.../thumb.webp",
  "has_variation": true,
  "default_variation_id": 12001,
  "pricing": { "currency": "USD", "current": 127.5, "compareAt": 150.0 },
  "variations": [
    {
      "id": 1,
      "name": "Weight",
      "type": "text",
      "values": [ { "id": 1, "value": "1 KG" }, { "id": 2, "value": "2 KG" } ]
    },
    {
      "id": 2,
      "name": "Color",
      "type": "color",
      "values": [ { "id": 4, "value": "Red", "hex": "#FF0000" } ]
    }
  ],
  "defaultSelection": { "1": 1, "2": 4 },
  "variantMap": {
    "1:1|2:4": { "variantId": 12001, "inStock": true,  "stockQty": 12, "price": 127.5, "compareAt": 150.0 },
    "1:2|2:4": { "variantId": 12002, "inStock": false, "stockQty": 0,  "price": 240.0, "compareAt": null }
  }
}
```

Field notes:
- **Required**: `id`, `name`, `has_variation`, `variations` (if has variations), `variantMap` (if client resolves locally)
- **Optional**: `thumbnail`, `pricing`, `default_variation_id`, `defaultSelection`

---

## 5) Alternative: Server Resolver Endpoint (Optional)

If you prefer a smaller `data-product`, omit `variantMap` and provide a resolver endpoint.

Request: `POST /products/resolve-variant`
```json
{
  "productId": 765,
  "selections": { "1": 1, "2": 4 }
}
```

Response:
```json
{
  "variantId": 12001,
  "sku": "MG-1KG-RED",
  "inStock": true,
  "stockQty": 12,
  "pricing": { "current": 127.5, "compareAt": 150.0 }
}
```

---

## 6) Add to Cart API Contract

Endpoint used by the Page Builder when the user clicks "Add to Cart".

Request: `POST /marketplace/cart/add-to-cart`
```json
{
  "item_id": 12001,           
  "qty": 1,
  "customer_note": "",
  "type": "product"
}
```

Notes:
- `item_id` should be the concrete `variantId` when variations exist, otherwise the `productId` (or a default variation id if provided by the backend).

Success Response (example):
```json
{
  "status": true,
  "data": {
    "id": 999,
    "products": [
      {
        "lineId": "abc123",
        "product_id": 765,
        "variation_id": 12001,
        "name": "Mango",
        "qty": 1,
        "price": 127.5,
        "image": "https://.../thumb.webp"
      }
    ],
    "sub_total": "127.50",
    "total_amount": "127.50",
    "amount_to_pay": "127.50",
    "currency": "USD"
  },
  "message": "Added to cart"
}
```

---

## 7) Validation & UX Hints (Optional but Recommended)

- Precompute `values[].disabled` in `variations` to reflect stock/constraints.
- Include per-variant fields in `variantMap` when available:
  - `image` (to swap thumbnails on hover/selection)
  - `maxPerOrder` (limit UI qty selector)
  - `preorder` and `eta`
- Provide `wishlisted` boolean to toggle heart icon.

---

## 8) Security & Size Considerations

- Keep `data-product` under ~4–8KB per card for grids; if larger, prefer the resolver endpoint.
- Never embed secrets or user data.
- Ensure JSON is valid and HTML-escaped correctly (attribute uses single quotes; JSON uses double quotes).

---

## 9) Quick Checklist

- Card container has `data-product='{"id":..., ...}'`.
- Buttons include `data-attribute-id` and `data-value-id`.
- `variantMap` present OR resolver endpoint implemented.
- Add-to-Cart endpoint accepts `item_id` for variant/product.

This contract enables the Page Builder to power product cards with variations purely from the HTML the backend generates.


