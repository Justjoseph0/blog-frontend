import React from 'react'
import Slider from 'react-slick';
import PostCard from './PostCard';

const CardCarousel = ({posts}) => {

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        responsive: [
          {
            breakpoint: 1440, 
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            },
          },
    
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

      
  return (
    <div>
      <Slider {...settings}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Slider>
    </div>
  )
}

export default CardCarousel