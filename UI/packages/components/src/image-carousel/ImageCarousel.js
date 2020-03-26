import React from "react";
import PropTypes from "prop-types";

import { Carousel, CarouselControl, CarouselItem } from "reactstrap";

import "./image-carousel.css";

class ImageCarousel extends React.Component {
    constructor(props) {
        super(props);

        this.state = { activeImageIndex: 0 };

        this.nextImage = this._nextImage.bind(this);
        this.previousImage = this._previousImage.bind(this);
    }

    _nextImage(images) {
        if (this.animating) return;

        const imageIndex = this.state.activeImageIndex;
        const imagesCount = images.length;
        const nextIndex = imageIndex === imagesCount - 1 ? 0 : imageIndex + 1;
        this.setState({ activeImageIndex: nextIndex });
    }

    _previousImage(images) {
        if (this.animating) return;

        const imageIndex = this.state.activeImageIndex;
        const imagesCount = images.length;
        const nextIndex = imageIndex === 0 ? imagesCount - 1 : imageIndex - 1;
        this.setState({ activeImageIndex: nextIndex });
    }

    render() {
        const { activeImageIndex } = this.state;
        const { images, textGetter: altGetter } = this.props;

        return (
            <Carousel
                slide={false}
                interval={false}
                activeIndex={activeImageIndex}
                next={() => this.nextImage(images)}
                previous={() => this.previousImage(images)}
            >
                {images.map(image => (
                    <CarouselItem
                        className={"carousel-image"}
                        onExiting={() => (this.animating = true)}
                        onExited={() => (this.animating = false)}
                        key={image.url}
                    >
                        <img
                            src={image.url}
                            alt={altGetter && altGetter(image)}
                        />
                    </CarouselItem>
                ))}
                {images.length > 1 && (
                    <div>
                        <CarouselControl
                            direction="prev"
                            directionText="Previous"
                            onClickHandler={() => this.previousImage(images)}
                        />
                        <CarouselControl
                            direction="next"
                            directionText="Next"
                            onClickHandler={() => this.nextImage(images)}
                        />
                    </div>
                )}
            </Carousel>
        );
    }
}

ImageCarousel.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired
        })
    ).isRequired
};

export default ImageCarousel;
