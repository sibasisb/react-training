import React, { useEffect, useState } from 'react'
import '../stylesheets/styles.css'

const Home=(props)=>{
    const [mySlides,setMySlides]=useState([])
    const [dots,setDots]=useState([])
    const [mySlideIndex,setIndex]=useState(1)
    const username=props.location.state.user.firstName
    useEffect(()=>{
        let tempDots=dots
        tempDots=tempDots.map((temp,index)=>{
            if(index!==(mySlideIndex-1))
                return (
                    <span className="dot" onClick={()=>{currentSlide(index+1)}} key={index}></span>
                )
            else
                return (
                    <span className="dot active" onClick={()=>{currentSlide(index+1)}} key={index}></span>
                )
        })
        setDots(tempDots)
    },[mySlideIndex])
    useEffect(()=>{
        let slides=[
            <div className="myslide">
                <img src="https://images.unsplash.com/photo-1441123285228-1448e608f3d5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="simple fruits" width={"100%"} height={"500px"}/>
            </div>,
            <div className="myslide">
                <img src="https://images.unsplash.com/photo-1610444833641-0542660a4ed7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="fruit basket" width={"100%"} height={"500px"}/>
            </div>,
            <div className="myslide">
                <img src="https://images.unsplash.com/photo-1609780447631-05b93e5a88ea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80" alt="fruit market" width={"100%"} height={"500px"}/>
            </div>
        ];
        let myDots=[
            <span className="dot" onClick={()=>{currentSlide(1)}} key={0}></span>,
            <span className="dot" onClick={()=>{currentSlide(2)}} key={1}></span>,
            <span className="dot" onClick={()=>{currentSlide(3)}} key={2}></span>
        ];
        setIndex(1)
        setMySlides(slides)
        setDots(myDots)
    },[])
    
    // Next/previous controls
    function plusSlides(n) {
        let idx=mySlideIndex+n;
        if(idx<1)
            setIndex(mySlides.length)
        else if(idx>mySlides.length)
            setIndex(idx%mySlides.length)
        else
            setIndex(idx)
    }

    // Thumbnail image controls
    function currentSlide(n) {
        setIndex(n)
    }

    function showSlides() {
        return mySlides[mySlideIndex-1];
    }

    return (
        <div>
            <section>
                <h1>Welcome, {username?.toUpperCase()}</h1>
                <div className="carousel-container">
                    {showSlides()}
                    <span className="prev" onClick={()=>{plusSlides(-1)}}>&#10094;</span>
                    <span className="next" onClick={()=>{plusSlides(1)}}>&#10095;</span>
                    <div style={{textAlign:"center"}}>
                    {dots}
                    </div>
                </div>
            </section>
        </div>
    )
} 

export default Home;