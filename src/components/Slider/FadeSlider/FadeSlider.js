import React, { Component } from 'react';
import { connect } from 'react-redux';

import FadeSlide from './FadeSlide/FadeSlide';
import Dot from '../Dot/Dot';

import LeftArrow from '../Arrow/LeftArrow';
import RightArrow from '../Arrow/RightArrow';

import './FadeSlider.scss';

const slidesImages = [
    { title: "Slide Title 1", image: "http://www.keenthemes.com/preview/conquer/assets/plugins/jcrop/demos/demo_files/image1.jpg", description: "description 1" },
    { title: "Slide Title 2", image: "http://www.keenthemes.com/preview/conquer/assets/plugins/jcrop/demos/demo_files/image2.jpg", description: "description 2" },
    { title: "Slide Title 3", image: "http://www.keenthemes.com/preview/conquer/assets/plugins/jcrop/demos/demo_files/image3.jpg", description: "description 3" },
    { title: "Slide Title 4", image: "http://www.keenthemes.com/preview/conquer/assets/plugins/jcrop/demos/demo_files/image1.jpg", description: "description 1" },
    { title: "Slide Title 5", image: "http://www.keenthemes.com/preview/conquer/assets/plugins/jcrop/demos/demo_files/image2.jpg", description: "description 2" },
    { title: "Slide Title 6", image: "http://www.keenthemes.com/preview/conquer/assets/plugins/jcrop/demos/demo_files/image3.jpg", description: "description 3" },
];

let timer;

class FadeSlider extends Component {
    state = {
        currentIndex: 0
    };

    componentDidMount () {
        this.autoPlay();
    }

    autoPlay = () => {
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => this.nextSlide(), 10000);
    };

    prevSlide = () => {
        this.setState(prevState => {
            return { currentIndex: prevState.currentIndex === 0
                    ? slidesImages.length - 1
                    : prevState.currentIndex - 1
            }
        });
        this.autoPlay();
    };

    nextSlide = () => {
        this.setState(prevState => {
            return { currentIndex: prevState.currentIndex === slidesImages.length - 1
                    ? 0
                    : prevState.currentIndex + 1
            }
        });
        this.autoPlay();
    };

    goToSlideHandler = (i) => {
        this.setState({ currentIndex: i });
        this.autoPlay();
    };

    render () {
        const { currentIndex } = this.state;

        const slides = slidesImages.map((slide, i) =>
            <FadeSlide key={i} show={currentIndex === i} image={slide.image} title={slide.title} />
        );

        const dots = slidesImages.map((slide, i) =>
            <Dot key={i} id={i} active={currentIndex === i} clicked={this.goToSlideHandler}/>
        );

        return (
            <div className="FadeSlider">
                <div className="SlidesWrapper">
                    {slides}
                </div>
                <div className="Dots">
                    {dots}
                </div>
                <LeftArrow prevSlide={this.prevSlide} />
                <RightArrow nextSlide={this.nextSlide} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

    }
};

export default connect(mapStateToProps)(FadeSlider);