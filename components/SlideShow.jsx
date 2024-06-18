import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Slideshow = () => {
  return (
    <Carousel
      showThumbs={false}
      autoPlay
      infiniteLoop
      showStatus={false} // Hide status indicator
      interval={3000} // Set autoplay interval to 3 seconds
      stopOnHover={false}
      style={{ objectFit: "cover", borderRadius: "20px" }}
      width="100%"
      // Allow autoplay to continue on hover
    >
      <div>
        <img
          src="/1.jpg"
          height={330}
          style={{ objectFit: "cover", borderRadius: "20px" }} // Add border radius for rounded corners
        />
      </div>
      <div>
        <img
          src="/3.jpg"
          height={330}
          style={{ objectFit: "cover", borderRadius: "20px" }} // Add border radius for rounded corners
        />
      </div>
      <div>
        <img
          src="/4.jpg"
          height={330}
          style={{ objectFit: "cover", borderRadius: "20px" }} // Add border radius for rounded corners
        />
      </div>
    </Carousel>
  );
};

export default Slideshow;
