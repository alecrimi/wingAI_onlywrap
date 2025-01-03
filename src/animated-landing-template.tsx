import React, { useEffect } from 'react';

import 'bootstrap-icons/font/bootstrap-icons.css'; // For Bootstrap Icons
 
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);


const LandingPage = () => {
    useEffect(() => {
        // GSAP animation for #dashboard
        gsap.to("#dashboard", {
            scale: 1,
            translateY: "0%",
            rotateX: "0deg",
            scrollTrigger: {
                trigger: "#hero-section",
                start: window.innerWidth > 768 ? "top 95%" : "top 70%",
                end: "bottom bottom",
                scrub: 1,
                // markers: true, // Uncomment for debugging scrollTrigger markers
            },
        });

        // GSAP timeline for reveal-up elements
        const sections = document.querySelectorAll(".hero-section,.tw-relative,.reveal-up,.tw-mt-5,.tw-text-3xl "); // Change if needed
        sections.forEach((sec) => {
            const revealUptimeline = gsap.timeline({
                paused: true,
                scrollTrigger: {
                    trigger: sec,
                    start: "10% 80%", // Trigger when 10% of the section is visible
                    end: "20% 90%",
                },
            });

            revealUptimeline.to(sec.querySelectorAll(".reveal-up"), {
                opacity: 1,
                duration: 0.8,
                y: "0%", // Move elements from out-of-view to their normal position
                stagger: 0.2,
            });
        });

        // Initial setup for reveal-up elements
        gsap.set(".reveal-up", {
            opacity: 0,
            y: "100%",
        });
    }, []);

  return (
    <>
  
        <section
            class="hero-section tw-relative tw-flex tw-min-h-[100vh] tw-w-full tw-max-w-[100vw] tw-flex-col tw-overflow-hidden max-md:tw-mt-[50px]"
            id="hero-section"
        >
            <div
                class="tw-flex tw-h-full tw-min-h-[100vh] tw-w-full tw-flex-col tw-place-content-center tw-gap-6 tw-p-[5%] max-xl:tw-place-items-center max-lg:tw-p-4"
            >
                <div
                    class="tw-flex tw-flex-col tw-place-content-center tw-items-center"
                >
                    <div
                        class="reveal-up gradient-text tw-text-center tw-text-6xl tw-font-semibold tw-uppercase tw-leading-[80px] max-lg:tw-text-4xl max-md:tw-leading-snug"
                    >
                        <span class=""> Improve your Game </span>
                        <br />
                        <span class="">  Get more results </span>
                    </div>
                    <div
                        class="reveal-up tw-mt-10 tw-max-w-[450px] tw-p-2 tw-text-center tw-text-gray-300 max-lg:tw-max-w-full"
                    >
                        Use AI to reply on Tinder and messaging.
                    </div>

                    <div
                        class="reveal-up tw-mt-10 tw-flex tw-place-items-center tw-gap-4"
                    >
                        <a
                            class="btn tw-bg-[#7e22ce85] tw-shadow-lg tw-shadow-primary tw-transition-transform tw-duration-[0.3s] hover:tw-scale-x-[1.03]"
                            href=""
                        >
                            Get started
                        </a>
                        <a
                            class="btn tw-flex tw-gap-2 !tw-bg-black !tw-text-white tw-transition-colors tw-duration-[0.3s] hover:!tw-bg-white hover:!tw-text-black"
                            href=""
                        >
                            <i class="bi bi-play-circle-fill"></i>
                            <span>Learn more</span>
                        </a>
                    </div>
                </div>

                <div
                    class="tw-relative tw-mt-8 tw-flex tw-w-full tw-place-content-center tw-place-items-center"
                    id="dashboard-container"
                >
                    <div
                        class="tw-relative tw-max-w-[80%] tw-overflow-hidden tw-rounded-xl tw-bg-transparent max-md:tw-max-w-full"
                        id="dashboard"
                    >
                        <img
                            src="./assets/images/home/dashboard.png"
                           
                        />
                    </div>

                    <div
                        class="hero-img-bg-grad tw-absolute tw-left-[20%] tw-top-5 tw-h-[200px] tw-w-[200px] tw-z-0"
                    ></div>
                </div>
            </div>
        </section>
        
        <section
            class="tw-relative tw-flex tw-w-full tw-max-w-[100vw] tw-flex-col tw-place-content-center tw-place-items-center tw-overflow-hidden tw-p-6"
        >
            <div
                class="tw-mt-8 tw-flex tw-flex-col tw-place-items-center tw-gap-5"
            >
                <div
                    class="reveal-up tw-mt-5 tw-flex tw-flex-col tw-gap-3 tw-text-center"
                >
                    <h2
                        class="tw-text-4xl tw-font-medium tw-text-gray-200 max-md:tw-text-3xl"
                    >
                        Key benifits
                    </h2>
                </div>
                <div
                    class="tw-mt-6 tw-flex tw-max-w-[80%] tw-flex-wrap tw-place-content-center tw-gap-8 max-lg:tw-flex-col"
                >
                    <div
                        class="reveal-up tw-flex tw-h-[400px] tw-w-[450px] tw-flex-col tw-gap-3 tw-text-center max-md:tw-w-[320px]"
                    >
                        <div
                            class="border-gradient tw-h-[200px] tw-w-full tw-overflow-hidden max-md:tw-h-[150px]"
                        >
                            <div
                                class="tw-flex tw-h-full tw-w-full tw-place-content-center tw-place-items-end tw-p-2"
                            >
                                <i
                                    class="bi bi-rocket-takeoff-fill tw-text-7xl tw-text-gray-200 max-md:tw-text-5xl"
                                ></i>
                            </div>
                        </div>
                        <div class="tw-flex tw-flex-col tw-gap-4 tw-p-2">
                            <h3
                                class="tw-mt-8 tw-text-2xl tw-font-normal tw-text-gray-400  max-md:tw-text-xl"
                            >
                                Minimize hours spent
                            </h3>
                            <div class="tw-text-gray-300">
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit.
                            </div>
                        </div>
                    </div>
                    <div
                        class="reveal-up tw-flex tw-h-[400px] tw-w-[450px] tw-flex-col tw-gap-3 tw-text-center max-md:tw-w-[320px]"
                    >
                        <div
                            class="border-gradient tw-h-[200px] tw-w-full tw-overflow-hidden max-md:tw-text-[150px]"
                        >
                            <div
                                class="tw-flex tw-h-full tw-w-full tw-place-content-center tw-place-items-end tw-p-2"
                            >
                                <i
                                    class="bi bi-layout-sidebar-inset tw-text-7xl tw-text-gray-200 max-md:tw-text-5xl"
                                ></i>
                            </div>
                        </div>
                        <div class="tw-flex tw-flex-col tw-gap-4 tw-p-2">
                            <h3
                                class="tw-mt-8 tw-text-2xl tw-font-normal
                                
                                tw-text-gray-400 
                                
                                max-md:tw-text-xl"
                            >
                                Simple to use
                            </h3>
                            <div class="tw-text-gray-300">
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit.
                            </div>
                        </div>
                    </div>
                    <div
                        class="reveal-up tw-flex tw-h-[400px] tw-w-[450px] tw-flex-col tw-gap-3 tw-text-center max-md:tw-w-[320px]"
                    >
                        <div
                            class="border-gradient tw-h-[200px] tw-w-full tw-overflow-hidden max-md:tw-h-[150px]"
                        >
                            <div
                                class="tw-flex tw-h-full tw-w-full tw-place-content-center tw-place-items-end tw-p-2"
                            >
                                <i
                                    class="bi bi-lightning-charge-fill tw-text-7xl tw-text-gray-200 max-md:tw-text-5xl"
                                ></i>
                            </div>
                        </div>
                        <div class="tw-flex tw-flex-col tw-gap-4 tw-p-2">
                            <h3
                                class="tw-mt-8 tw-text-2xl tw-font-normal 
                                tw-text-gray-400
                                
                                max-md:tw-text-xl"
                            >
                                Speed up your development
                            </h3>
                            <div class="tw-text-gray-300">
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      
        <section
            class="tw-mt-5 tw-flex tw-min-h-[80vh] tw-w-full tw-flex-col tw-place-content-center tw-place-items-center tw-p-[2%]"
        >
            <h3
                class="tw-text-4xl tw-font-medium tw-text-gray-200 max-md:tw-text-2xl"
            >
                You're in good hands
            </h3>
            
            
            
            <div
                class="tw-mt-8 tw-gap-10 tw-space-y-8 max-md:tw-columns-1 lg:tw-columns-2 xl:tw-columns-3"
            >
                <div
                    class=" tw-flex tw-h-fit tw-w-[350px] tw-break-inside-avoid tw-flex-col tw-gap-4 tw-rounded-lg tw-border-[1px] tw-border-outlineColor tw-bg-secondary tw-p-4 max-lg:tw-w-[320px]"
                >
                    <p class="tw-mt-4 tw-text-gray-300">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Beatae, vero.
                    </p>

                    <div class="tw-flex tw-place-items-center tw-gap-3">
                        <div
                            class="tw-h-[50px] tw-w-[50px] tw-overflow-hidden tw-rounded-full"
                        >
                            <img
                                src="./assets/images/people/women.jpg"
                                class="tw-w-full tw-h-auto tw-object-contain"
          style={{ maxWidth: '100%', height: 'auto' }} 
                                alt="women"
                            />
                        </div>
                        <div class="tw-flex tw-flex-col tw-gap-1">
                            <div class="tw-font-semibold tw-text-gray-400">Trich B</div>
                            <div class="tw-text-gray-400">AMI, ceo</div>
                        </div>
                    </div>
                </div>
                <div
                    class="reveal-up tw-flex tw-h-fit tw-w-[350px] tw-break-inside-avoid tw-flex-col tw-gap-4 tw-rounded-lg tw-border-[1px] tw-border-outlineColor tw-bg-secondary tw-p-4 max-lg:tw-w-[320px]"
                >
                    <p class="tw-mt-4 tw-text-gray-300">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Inventore deserunt delectus consectetur enim cupiditate
                        ab nemo voluptas repellendus qui quas..
                    </p>

                    <div class="tw-flex tw-place-items-center tw-gap-3">
                        <div
                            class="tw-h-[50px] tw-w-[50px] tw-overflow-hidden tw-rounded-full"
                        >
                            <img
                                src="./assets/images/people/man.jpg"
                                class="tw-h-full tw-w-full tw-object-cover"
                                alt="man"
                            />
                        </div>
                        <div class="tw-flex tw-flex-col tw-gap-1">
                            <div class="tw-font-semibold  tw-text-gray-400">John B</div>
                            <div class="tw-text-gray-400">ABC, cto</div>
                        </div>
                    </div>
                </div>
                <div
                    class="reveal-up tw-flex tw-h-fit tw-w-[350px] tw-break-inside-avoid tw-flex-col tw-gap-4 tw-rounded-lg tw-border-[1px] tw-border-outlineColor tw-bg-secondary tw-p-4 max-lg:tw-w-[320px]"
                >
                    <p class="tw-mt-4 tw-text-gray-300">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quidem, numquam.
                    </p>

                    <div class="tw-flex tw-place-items-center tw-gap-3">
                        <div
                            class="tw-h-[50px] tw-w-[50px] tw-overflow-hidden tw-rounded-full"
                        >
                            <img
                                src="./assets/images/people/man2.jpg"
                                class="tw-h-full tw-w-full tw-object-cover"
                                alt="man"
                            />
                        </div>
                        <div class="tw-flex tw-flex-col tw-gap-1">
                            <div class="tw-font-semibold tw-text-gray-400">Mante</div>
                            <div class="tw-text-gray-400">xyz, cto</div>
                        </div>
                    </div>
                </div>
                <div
                    class="reveal-up tw-flex tw-h-fit tw-w-[350px] tw-break-inside-avoid tw-flex-col tw-gap-4 tw-rounded-lg tw-border-[1px] tw-border-outlineColor tw-bg-secondary tw-p-4 max-lg:tw-w-[320px]"
                >
                    <p class="tw-mt-4 tw-text-gray-300">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Soluta, saepe illum. Dicta quisquam praesentium
                        quod!
                    </p>

                    <div class="tw-flex tw-place-items-center tw-gap-3">
                        <div
                            class="tw-h-[50px] tw-w-[50px] tw-overflow-hidden tw-rounded-full"
                        >
                            <img
                                src="./assets/images/people/women.jpg"
                                class="tw-h-full tw-w-full tw-object-cover"
                                alt="man"
                            />
                        </div>
                        <div class="tw-flex tw-flex-col tw-gap-1">
                            <div class="tw-font-semibold tw-text-gray-400">Lara</div>
                            <div class="tw-text-gray-400">xz, cto</div>
                        </div>
                    </div>
                </div>
                <div
                    class="reveal-up tw-flex tw-h-fit tw-w-[350px] tw-break-inside-avoid tw-flex-col tw-gap-4 tw-rounded-lg tw-border-[1px] tw-border-outlineColor tw-bg-secondary tw-p-4 max-lg:tw-w-[320px]"
                >
                    <p class="tw-mt-4 tw-text-gray-300">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Fuga accusamus non enim debitis rem neque beatae
                        explicabo corrupti porro ullam?
                    </p>

                    <div class="tw-flex tw-place-items-center tw-gap-3">
                        <div
                            class="tw-h-[50px] tw-w-[50px] tw-overflow-hidden tw-rounded-full"
                        >
                            <img
                                src="./assets/images/people/man.jpg"
                                class="tw-h-full tw-w-full tw-object-cover"
                                alt="man"
                            />
                        </div>
                        <div class="tw-flex tw-flex-col tw-gap-1">
                            <div class="tw-font-semibold tw-text-gray-400">James</div>
                            <div class="tw-text-gray-400">app, cto</div>
                        </div>
                    </div>
                </div>
                <div
                    class="reveal-up tw-flex tw-h-fit tw-w-[350px] tw-break-inside-avoid tw-flex-col tw-gap-4 tw-rounded-lg tw-border-[1px] tw-border-outlineColor tw-bg-secondary tw-p-4 max-lg:tw-w-[320px]"
                >
                    <p class="tw-mt-4 tw-text-gray-300">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Fuga accusamus non enim debitis rem neque beatae
                        explicabo corrupti porro ullam?
                    </p>

                    <div class="tw-flex tw-place-items-center tw-gap-3">
                        <div
                            class="tw-h-[50px] tw-w-[50px] tw-overflow-hidden tw-rounded-full"
                        >
                            <img
                                src="./assets/images/people/man2.jpg"
                                class="tw-h-full tw-w-full tw-object-cover"
                                alt="man"
                            />
                        </div>
                        <div class="tw-flex tw-flex-col tw-gap-1">
                            <div class="tw-font-semibold tw-text-gray-400">Ron</div>
                            <div class="tw-text-gray-400">marketplace, cto</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
   </>
  );
};

export default LandingPage;
