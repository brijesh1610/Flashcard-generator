/*  here we are created flasshcard detail page which will shown when user clicks on view card page in starting of this page we will show group name and group discription before group name we are having back arrow button oncilcing 
on that we will go one step back using useNavigate. then we are showing cards name and description of card with card image.
then share, download and print button. in share button  user can copy link and share it then we have diff. buttons
to sociel media using there acrroding buttons*/




import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BiShare, BiShareAlt, BiCopy, BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import demo from "../assets/tab-hand.jpeg"

import {
    AiOutlineDownload,
    AiFillPrinter,
    AiFillCloseCircle,
} from "react-icons/ai";
import Facebook from "../assets/facebook-icon.svg";
import Linkedin from "../assets/linkedin-icon.svg";
import Whatsapp from "../assets/whatsapp-icon.svg";
import Twitter from "../assets/twitter-icon.svg";
import Mail from "../assets/mail-icon.svg";
import {
    FacebookShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    TwitterShareButton,
    EmailShareButton,
} from "react-share";

import domtoimage from "dom-to-image";
// This function is used to download the image of the card and save it as a JPEG file.
const handleDownloadImage = () => {
    domtoimage
        .toJpeg(document.getElementById("cardImage"), { quality: 0.95 })
        .then(function (dataUrl) {
            var link = document.createElement("a");
            link.download = "FlashCard.jpeg";
            link.href = dataUrl;
            link.click();
        });
};

function FlashcardDetailPage() {
    const { groupId } = useParams();// retrieve route parameters from the component rendered by the matching route
    const navigate = useNavigate();

    const cards = useSelector((state) => state.flashcard.flashcards);

    const [ourCard, setOurCard] = useState({});
    const [singleCardDetail, setSingleCardDetail] = useState({});
    /*filter the cards which have cardid = id and give card to singlecarddetails */

    const displayCard = (id) => {
        const showSingleCard = ourCard.cards.filter((c) => c.cardid === id);
        setSingleCardDetail(showSingleCard[0]);
    };


    useEffect(() => {
        if (!groupId || !cards) return;
        const temp = cards.filter((c) => c.card.groupid === groupId);
        setOurCard(temp[0].card);
    }, [groupId, cards]);

    useEffect(() => {
        ourCard.cards && setSingleCardDetail(ourCard.cards[0]);
    }, [ourCard]);

    const handlePrint = () => {
        window.print();
    };

    const [isCopied, setIsCopied] = useState(false);//state for copy link
    const [url, setUrl] = useState();
    const [share, setShare] = useState("none");//state for share link

    // share handler for show dispay
    const shareHandlerOpen = () => {
        setShare("flex");
        setUrl(`${document.location.href}`);
    };
    const shareHandlerClose = () => {
        setShare("none");
    };
    //show message after libk copied
    useEffect(() => {
        isCopied &&
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
    }, [isCopied]);

    return (

        // flashcard detail
        <section className="flex flex-col text-slate-600 " >
            <header className="flex" >
                <BiArrowBack
                    className="text-3xl mr-6 cursor-pointer"
                    onClick={() => navigate(-1)}
                />
                <div className="flex flex-col" >
                    <h2 className="text-xl text-black font-bold">{ourCard.groupname}</h2>
                    {ourCard.groupdescription && (
                        <p className=" my-2" >{ourCard.groupdescription}</p>
                    )}
                </div>
            </header>


            <main className="mt-6 grid grid-rows-1 md:grid-cols-4" >
                <aside className="col-span-1 bg-white w-[70vw] md:w-[14rem] xl:w-[17rem] m-5 px-4 py-5 h-fit mr-2 rounded-md " >
                    <h2 className="p-2">Flashcards</h2>
                    <hr />
                    <hr className="mb-2 mr-4 " />
                    {ourCard.cards &&
                        ourCard.cards.map((card) => (
                            <p
                                key={card.cardid}
                                className={`py-2 px-8 text-slate-700 font-medium hover:bg-slate-100 cursor-pointer ${card.cardid === singleCardDetail.cardid &&
                                    "!text-red-500 !font-bold"
                                    }`}
                                onClick={() => displayCard(card.cardid)}
                            >
                                {card.cardname}
                            </p>
                        ))}
                </aside>

                <section
                    id="cardImage"
                    className="col-span-3 md:col-span-2 flex flex-col xl:flex-row items-center w-full bg-white shadow-lg rounded-lg"
                >
                    <img
                        src={demo}
                        alt="cardimage"
                        className="object-contain w-[32rem] xl:w-[20vw] h-full p-6"
                    />
                    <p className={`w-full p-6 py-10 `}>
                        {singleCardDetail.carddefination}
                    </p>
                </section>

                <aside className="col-span-1 hidden md:flex flex-col items-center space-y-5">
                    <button
                        type="text"
                        onClick={shareHandlerOpen}
                        className="flex items-center py-3 px-4 xl:w-60 space-x-5 bg-white rounded-md shadow-lg active:scale-100 transition-all duration-100 hover:scale-105"
                    >
                        <BiShare className="scale-x-[-1]" />
                        <span >Share</span>
                    </button>

                    <button
                        onClick={handleDownloadImage}
                        className="flex items-center py-3 px-4 xl:w-60 space-x-5 bg-white rounded-md shadow-lg active:scale-100 transition-all duration-100 hover:scale-105"
                    >
                        <AiOutlineDownload />
                        <span>Download</span>
                    </button>
                    <button
                        onClick={handlePrint}
                        className="flex items-center py-3 px-4 xl:w-60 space-x-5 bg-white rounded-md shadow-lg active:scale-100 transition-all duration-100 hover:scale-105"
                    >
                        <AiFillPrinter />
                        <span>Print</span>
                    </button>
                </aside>
            </main>

            {/* share popup box */}

            <div className="popupBox" style={{ display: share }}>
                <div className="relative w-11/12 xl:w-2/5 sm:w-11/12 p-3 sm:p-8 bg-white rounded-lg inline-table">
                    <h3 className="text-lg font-semibold mb-2 ">Share :</h3>
                    <div className="flex sm:items-center flex-col sm:flex-row ">
                        <span className="w-6/7 px-2 py-6 rounded-lg outline-dashed outline-1 outline-blue-200 inline-table">
                            <span>Link :</span>&nbsp;&nbsp;
                            <span className="inline-block">{url}</span>
                            <h2 className="p-2 h-5 ml-3 text-sm text-red-500 font-semibold">
                                {isCopied && "Link copied to clipboard"}
                            </h2>
                        </span>

                        <span className="flex mt-3 sm:mt-0">
                            <BiCopy
                                className="text-2xl ml-4  mb-5 cursor-pointer"
                                onClick={() => setIsCopied(true)}
                            />
                            <BiShareAlt className="text-2xl  ml-4  mb-6 cursor-pointer" />
                            <AiFillCloseCircle
                                className="closebtn"
                                onClick={shareHandlerClose}
                            />
                        </span>
                    </div>
                    <div className="mt-6 flex items-center space-x-10 justify-center">
                        <FacebookShareButton url="https://www.facebook.com/">
                            <img
                                src={Facebook}
                                alt="Facebook"
                                className="w-10 p-2 bg-amber-100 rounded-lg cursor-pointer"
                            />
                        </FacebookShareButton>
                        <LinkedinShareButton url="https://www.linkedin.com/">
                            <img
                                src={Linkedin}
                                alt="Linkedin"
                                className="w-10 p-2 bg-amber-100 rounded-lg cursor-pointer"
                            />
                        </LinkedinShareButton>
                        <WhatsappShareButton url="https://web.whatsapp.com/">
                            <img
                                src={Whatsapp}
                                alt="Whatsapp"
                                className="w-10 p-2 bg-amber-100 rounded-lg cursor-pointer"
                            />
                        </WhatsappShareButton>
                        <TwitterShareButton url="https://twitter.com/">
                            <img
                                src={Twitter}
                                alt="Twitter"
                                className="w-10 p-2 bg-amber-100 rounded-lg cursor-pointer"
                            />
                        </TwitterShareButton>
                        <EmailShareButton url="https://gmail.com/">
                            <img
                                src={Mail}
                                alt="Mail"
                                className="w-10 p-2 bg-amber-100 rounded-lg cursor-pointer"
                            />
                        </EmailShareButton>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default FlashcardDetailPage;