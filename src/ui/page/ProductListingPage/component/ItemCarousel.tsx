import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import  "../style.css"


export default function ItemCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex:number) => {
    setIndex(selectedIndex);
  };

  return (

      <Carousel
        activeIndex={index}
        onSelect={handleSelect}

        style={{ height: '350px', overflow: 'hidden' }}
      >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.apple.com/hk/en/iphone-16-pro/images/overview/product-viewer/iphone-pro/all_colors__fdpduog7urm2_large_2x.jpg"
            style={{height: "300px", objectFit: 'cover'}}
          />
          <Carousel.Caption>
            <h3>Take a closer look</h3>
            <p>6.3 inch iPhone 16 Pro</p>
          </Carousel.Caption>:
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.apple.com/v/tv-home/o/images/overview/hero__dbphk49ymi2q_large_2x.jpg"
            style={{height: "300px", objectFit: 'cover'}}
          />
          <Carousel.Caption>
            <h3>Sharp as a Mac</h3>
            <p>Learn more about macOS</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.apple.com/v/apple-watch-series-10/d/images/overview/finishes-titanium/gallery/titanium_gold_01__bchfg241hqv6_large_2x.jpg"
            style={{height: "300px", objectFit: 'cover'}}
          />
          <Carousel.Caption>
            <h3>Thinstant classic</h3>
            <p>
              Apple Watch Series 10
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

  );
}
