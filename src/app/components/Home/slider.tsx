<div id="site-slider" class="relative overflow-hidden group"
    data-autoplay="true"
    data-autoplay-speed="7000"
    data-height-base="320px"
    data-height-sm="320px"
    data-height-md="460px"
    data-height-lg="560px"
    data-height-xl="660px"
    data-overlay-color="#000000"
    data-overlay-opacity="20">

    <div id="slides-container" class="flex duration-700 ease-in-out">

        <!-- Slide 1 -->
        <div class="slide-item w-full flex-shrink-0 relative"
            style="background-image: url('assets/images/Slider-01.webp');">

            <div class="absolute inset-0 z-10 hero-overlay"></div>

            <div class="relative container z-20">
                <div class="container-wrapper">
                    <div class="te-hero-item grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_1.618fr] items-center">
                        <div class="col-span-1">
                            <div class="space-y-6">
                                <h2 class="slider-title text-3xl md:text-4xl lg:text-5xl font-bold leading-tight animated text-white">
                                    Grace and Style For All Occasions
                                </h2>
                                <p class="text-base lg:text-xl text-white animated">
                                    Exquisite pieces that embody elegance, and enduring beauty
                                </p>
                                <a href="#" class="te-btn te-btn-primary animated">Shop Collection</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>

        <!-- Slide 2 -->
        <div class="slide-item w-full flex-shrink-0 relative"
            style="background-image: url('assets/images/Slider-02.webp');">

            <div class="absolute inset-0 z-10 hero-overlay"></div>

            <div class="relative container z-20">
                <div class="container-wrapper">
                    <div class="te-hero-item grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_1.618fr] items-center gap-12">
                        <div class="col-span-1">
                            <div class="space-y-6">
                                <h2 class="slider-title text-3xl md:text-4xl lg:text-5xl font-bold leading-tight animated text-white">
                                    Where Elegance Meets Craftsmanship
                                </h2>
                                <p class="text-lg text-white animated">
                                    Each piece tells a story of artistry, sophistication, and everlasting beauty.
                                </p>
                                <a href="#" class="te-btn te-btn-primary animated">Shop the Collection</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>


    </div>

    <button id="prev-slide" class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-75 opacity-0 group-hover:opacity-100 ease-in-out duration-300 focus:outline-none z-30" aria-label="Previous Slide">
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m15 18-6-6 6-6"></path>
        </svg>
    </button>

    <button id="next-slide" class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-75 opacity-0 group-hover:opacity-100 ease-in-out duration-300 focus:outline-none z-30" aria-label="Next Slide">
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6"></path>
        </svg>
    </button>

    <div id="pagination-dots" class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        <!-- Pagination dots will be generated automatically by JavaScript -->
    </div>

</div>