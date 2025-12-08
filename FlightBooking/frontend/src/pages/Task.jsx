import React from 'react'
import concert from '../../src/assets/concert.jpg'
import playButton from '../../src/assets/Play.png'
import microsoft from '../assets/microsoft.png'
import google from '../assets/google.png'
import oracle from '../assets/oracle.png'
import facebook from '../assets/facebook.png'
import nokia from '../assets/nokia.png'
import airbnb from '../assets/bnb.png'
import apple from '../assets/apple.png'
import axure from '../assets/azure.png'
import phone from '../assets/Phone.png'
import shape from '../assets/Shape.png'
import map from '../assets/Map Pin.png'
import email from '../assets/Email.png'

function Task() {
    return (
        <>
            <section className="xl:relative w-screen xl:w-full max-w-[1920px] min-h-screen xl:h-[964px] mx-auto flex-col flex items-center justify-center text-white overflow-hidden">

                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${concert})` }}
                ></div>

                <div className="absolute inset-0 bg-linear-to-b from-[#381DDB]/90 to-black/60"></div>

                <div className="absolute xl:top-[225px] xl:w-[970px] xl:h-[388px] xl:left-1/2 xl:-translate-x-1/2 flex flex-col text-center gap-5 xl:gap-10">
                    <h1 className="xl:h-44 font-extrabold font-[Montserrat]">
                        <span className="xl:text-[72px]">The Best Experience Of </span>
                        <span className="text-[#f78888] xl:text-[72px]">Music </span>
                        <span className="xl:text-[72px]">In 2021</span>
                    </h1>

                    <p className="xl:h-[76px] sm:text-base xl:text-2xl text-gray-200 font-[/Subtitle/Regular]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae ligula
                        placerat, eleifend ex non, vehicula libero. Suspendisse eget tellus lectus.
                    </p>

                    <div className="xl:h-14 xl:w-full flex xl:flex-row flex-col justify-center gap-5">
                        <a className="bg-[#FC5252] xl:px-[38px] xl:py-[18px] items-center justify-center rounded-md font-semibold p-2 sm:w-auto">
                            Get Started
                        </a>

                        <a className="xl:h-14 rounded-md xl:w-[214px] sm:w-auto gap-5 flex justify-center items-center">
                            <img src={playButton} alt="Play" className="w-8 h-8" />
                            <span className="font-semibold text-lg">Watch Video</span>
                        </a>
                    </div>
                </div>

                <div className="absolute w-full flex justify-center gap-4 sm:gap-8 text-2xl sm:text-4xl xl:text-[144px] bottom-10 text-stroke-white font-extrabold">
                    <span>22d</span>
                    <span>13h</span>
                    <span>46m</span>
                    <span>18s</span>
                </div>
            </section>


            <section className="xl:relative sm:w-screen flex flex-col items-center  w-screen max-w-[1920px] xl:h-[414px] bg-white text-black mx-auto">




                <h2 className="xl:absolute text-[34px] sm:text-4xl font-extrabold xl:w-[241px] xl:left-1/2 xl:-translate-x-1/2 xl:top-[30px]">
                    Our Sponsors
                </h2>

                <div className="xl:relative xl:w-full flex justify-center items-center flex-row">
                    <div className="grid grid-cols-2 justify-center items-center sm:grid-cols-3 xl:grid-cols-4 gap-[60px] xl:w-[1170px] xl:h-[174px] xl:absolute xl:top-[104px] xl:left-1/2 xl:-translate-x-1/2">
                        <img src={google} className="h-[55.49px] w-[170px] object-contain" />
                        <img src={microsoft} className="h-[36.31px] w-[170px] object-contain" />
                        <img src={airbnb} className="h-[53.04px] w-[170px] object-contain" />
                        <img src={axure} className="h-[48.48px] w-[170px] object-contain" />
                        <img src={apple} className="h-[58.13px] w-[170px] object-contain" />
                        <img src={facebook} className="h-[33.7px] w-[170px] object-contain" />
                        <img src={nokia} className="h-[28.63px] w-[170px] object-contain" />
                        <img src={oracle} className="h-[22.24px] w-[170px] object-contain" />
                    </div>


                </div>
                <svg
                    className="xl:absolute xl:left-[1752px] xl:top-[185px] sm:right-10 sm:w-20 sm:bottom-10"
                    width="111"
                    height="125"
                    viewBox="0 0 111 125"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M34.0003 100.282L12.1125 19.0911L94.2718 40.718L34.0003 100.282Z" fill="#FFA3A3" />
                    <path d="M83.9866 66.38L28.6512 121.065L8.55685 46.5249L83.9866 66.38Z" stroke="#222222" strokeWidth="4" />
                </svg>
                <div className="xl:absolute xl:mt-0 my-2 xl:top-[358px] xl:left-1/2 xl:-translate-x-1/2">
                    <button className="button-dark-blue text-white px-[34px] py-[18px] radius-[8px]">
                        Become a Sponsor
                    </button>
                </div>
            </section>


            <section className="xl:relative sm:w-screen w-full xl:max-w-[1920px] xl:h-[662px] flex xl:flex-row  flex-col mx-auto gap-5 xl:gap-0">





                <div className="xl:w-[845px] bg-[#381DDB] text-white flex flex-col   xl:justify-center xl:relative">

                    <div className="absolute xl:left-[636px] xl:top-[453px] xl:w-[209px] xl:h-[209px] bg-[#FFA3A3] rounded-tl-full opacity-90"></div>
                    <div className="absolute xl:left-[621px] xl:top-[430px] xl:w-[120px] xl:h-[120px] bg-blue-300 rounded-full opacity-80"></div>

                    <div className="xl:absolute xl:top-[120px] xl:left-20">
                        <h2 className="text-3xl font-bold mb-2">Contact us</h2>
                        <p className="xl:text-[24px] opacity-70 xl:h-[38px] xl:w-[585px] font-[Raleway]">
                            Have an inquiry? We'll be happy to assist you
                        </p>
                    </div>

                    <div className="flex flex-col xl:absolute xl:top-[290px] xl:left-20 gap-10 my-2 xl:w-[440px] xl:h-[152px]">
                        <div className="flex items-center gap-2 w-[168px] xl:h-6">
                            <img className="w-6 h-6" src={phone} />
                            <p className='h-5 text-[16px] font-extrabold'>+92 333 6527366</p>
                        </div>

                        <div className="flex items-center gap-2 w-[226px] xl:h-6">
                            <img className="w-6 h-6" src={email} />
                            <p className='h-5 text-[16px] font-extrabold'>abuzer@greelogix.com</p>
                        </div>

                        <div className="flex items-center gap-2 w-[440px] xl:h-6">
                            <img className="w-6 h-6" src={map} />
                            <p className='h-5 text-[16px] font-extrabold'>
                                Plot 252, Block L Phase 2 Johar Town, Lahore, PK
                            </p>
                        </div>
                    </div>
                </div>

                <div className="xl:relative w-full xl:w-[1075px] xl:h-[662px]">
                    <form className="xl:absolute xl:left-[130px] xl:top-[103px] xl:w-[570px] xl:h-[456px] flex flex-col gap-10">
                        <h3 className="text-2xl font-semibold">Fill in your details</h3>

                        <div>
                            <label className="text-sm font-medium">Name</label>
                            <input type="text" placeholder="John Doe" className="w-full border-b border-gray-300" />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <input type="email" placeholder="johndoe2347@mail.com" className="w-full border-b border-gray-300" />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Message</label>
                            <textarea rows="4" placeholder="Write your message here..." className="w-full border-b border-gray-300"></textarea>
                        </div>

                        <button type="submit" className="w-full button-dark-blue text-white py-3 rounded-md font-semibold">
                            Submit
                        </button>
                    </form>


                </div>
                {/* <img
                    src={shape}
                    className="
            xl:absolute 
            w-[72px] h-12 
            xl:left-[1792px] xl:top-[614px]   

            2xl:left-[1792px] 2xl:top-[614px]   

            xl:right-5 xl:bottom-5 xl:left-auto xl:top-auto
            lg:right-5 lg:bottom-5
            xl:right-4 xl:bottom-4
            sm:right-4 sm:bottom-4
        "
                /> */}
            </section>

        </>
    )
}

export default Task
