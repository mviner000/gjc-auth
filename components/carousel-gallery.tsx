"use client";

import * as React from "react";

import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const IMAGES = [
  "https://i.imgur.com/6hbUxqX.jpg",
  "https://i.imgur.com/whmZ1n6.jpg",
  "https://i.imgur.com/sDD32EB.jpg",
  "https://i.imgur.com/gvZLp1w.jpg",
  "https://i.imgur.com/nFOKKTS.jpg",
];

const CardImage = ({ src }: { src: string }) => (
  <figure className="p-1">
    <img src={src} alt="" className="w-full h-full object-cover" />
  </figure>
);

const CarouselGallery = () => {
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <div className="md:mx-36 md:pt-3 md:pb-20">
    <Carousel
      plugins={[autoplayPlugin.current]}
      className="w-full max-w p-5 mx-auto"
      onMouseEnter={autoplayPlugin.current.stop}
      onMouseLeave={autoplayPlugin.current.reset}
    >
      <CarouselContent className="w-[480px] h-[480px] xxs:w-[334px] xxs:h-[334px]">
        {IMAGES.map((src, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-1">
                <CardImage src={src} />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-2 xxs:-left-3" />
      <CarouselNext className="-right-2" />
    </Carousel>
    </div>
  );
};

export default CarouselGallery;