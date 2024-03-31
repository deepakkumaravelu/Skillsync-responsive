
import React from "react";
import "./Gig.scss";
import { Carousel } from 'antd';
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";

function Gig() {
  const onChange = function(currentSlide) {
    console.log(currentSlide);
  };
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });
  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  return (
    <div className="gig">
    {isLoading ? (
      "loading"
    ) : error ? (
      "Something went wrong!"
    ) : (
      <div className="container">
        <div className="left">
          <span className="breadcrumbs">
            Skillsync {">"} Graphics & Design {">"}
          </span>
          <h1>{data.title}</h1>
          {isLoadingUser ? (
            "loading"
          ) : errorUser ? (
            "Something went wrong!"
          ) : (
            <div className="user">
              <img
                className="pp"
                src={dataUser.img || "/img/noavatar.jpg"}
                alt=""
              />
              <span>{dataUser.username}</span>
              {!isNaN(data.totalStars / data.starNumber) && (
                <div className="stars">
                  {Array(Math.round(data.totalStars / data.starNumber))
                    .fill()
                    .map((item, i) => (
                      <img src="/img/star.png" alt="" key={i} />
                    ))}
                  <span>{Math.round(data.totalStars / data.starNumber)}</span>
                </div>
              )}
            </div>
          )}
          <Carousel afterChange={onChange} className="slider" autoplay={true} autoplaySpeed={2000} speed={1000}>
                {/* <div>
                <img key={data.images[0]} src={data.images[0]} alt="" />
                </div>
                <div>
                <img key={data.images[1]} src={data.images[1]} alt="" />
                </div>
                <div>
                <img key={data.images[2]} src={data.images[2]} alt="" />
                </div> */}
                {data.images.map((img)=>(
                  <img key={img} src={img} alt=""/>
                ))}
        </Carousel>
          <h2>About This Gig</h2>
          <p>
           {data.desc}
          </p>
          <div className="seller">
            <h2>About The Seller</h2>
            {isLoadingUser ? ("Loading.."):errorUser ?("Something went wrong!"):(
            <div className="user">
              <img
                src={dataUser.img|| "/img/noavatar.jpg" }
                alt=""
              />
              <div className="info">
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars/data.starNumber)&&(
                <div className="stars">
                   {Array(Math.round(data.totalStars / data.starNumber))
                    .fill()
                    .map((item, i) => (
                      <img src="/img/star.png" alt="" key={i} />
                    ))}
                  <span>{Math.round(data.totalStars / data.starNumber)}</span>
                </div>)}
                <button>Contact Me</button>
              </div>
            </div>)}
            {isLoadingUser ? ("Loading.."):errorUser ?("Something went wrong!"):(
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">{dataUser.country}</span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">Aug 2022</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p>
               {dataUser.desc}
              </p>
            </div>)}
          </div>
          <Reviews gigId={id}/>
        </div>
        <div className="right">
          <div className="price">
            <h3>{data.shortTitle}</h3>
            <h2>₹ {data.price}</h2>
          </div>
          <p>
           {data.shortDesc}
          </p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>{data.deliveryTime} Days</span>
            </div>
            <div className="item">
              <img src="/img/recycle.png" alt="" />
              <span>{data.revisionNumber} Revisions</span>
            </div>
          </div>
          <div className="features">
            {data.features.map((feature)=>(
            <div className="item"key={feature}>
            <img src="/img/violetcheck.png" alt="" />
            <span>{feature}</span>
            </div>
            ))}
            {/* <div className="item">
              <img src="/img/violetcheck.png" alt="" />
              <span>Artwork delivery</span>
            </div>
            <div className="item">
              <img src="/img/violetcheck.png" alt="" />
              <span>Image upscaling</span>
            </div>
            <div className="item">
              <img src="/img/violetcheck.png" alt="" />
              <span>Additional design</span>
            </div> */}
          </div>
          <button>Continue</button>
        </div>
      </div>)}
    </div>
  );
}

export default Gig;
