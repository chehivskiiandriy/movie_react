import React, { Component } from 'react';
import { connect } from 'react-redux';

import TranslateSlide from './TranslateSlide/TranslateSlide';

import LeftArrow from '../Arrow/LeftArrow';
import RightArrow from '../Arrow/RightArrow';

import './TranslateSlider.scss';

const slidesImages = [
    { title: "Slide Title 1", image: "http://www.keenthemes.com/preview/conquer/assets/plugins/jcrop/demos/demo_files/image1.jpg", description: "description 1" },
    { title: "Slide Title 2", image: "http://www.keenthemes.com/preview/conquer/assets/plugins/jcrop/demos/demo_files/image2.jpg", description: "description 2" },
    { title: "Slide Title 3", image: "http://www.keenthemes.com/preview/conquer/assets/plugins/jcrop/demos/demo_files/image3.jpg", description: "description 3" },
    { title: "Slide Title 4", image: "http://www.keenthemes.com/preview/conquer/assets/plugins/jcrop/demos/demo_files/image1.jpg", description: "description 1" },
    { title: "Slide Title 5", image: "http://www.keenthemes.com/preview/conquer/assets/plugins/jcrop/demos/demo_files/image2.jpg", description: "description 2" },
    { title: "Slide Title 6", image: "http://www.keenthemes.com/preview/conquer/assets/plugins/jcrop/demos/demo_files/image3.jpg", description: "description 3" },
    { title: "Slide Title 7", image: "http://www.keenthemes.com/preview/conquer/assets/plugins/jcrop/demos/demo_files/image1.jpg", description: "description 1" },
    { title: "Slide Title 8", image: "http://www.keenthemes.com/preview/conquer/assets/plugins/jcrop/demos/demo_files/image2.jpg", description: "description 2" },
    { title: "Slide Title 9", image: "http://www.keenthemes.com/preview/conquer/assets/plugins/jcrop/demos/demo_files/image3.jpg", description: "description 3" },
    { title: "Slide Title 10", image: "http://www.keenthemes.com/preview/conquer/assets/plugins/jcrop/demos/demo_files/image1.jpg", description: "description 1" },
    { title: "Slide Title 11", image: "http://www.keenthemes.com/preview/conquer/assets/plugins/jcrop/demos/demo_files/image2.jpg", description: "description 2" },
    { title: "Slide Title 12", image: "http://www.keenthemes.com/preview/conquer/assets/plugins/jcrop/demos/demo_files/image3.jpg", description: "description 3" }
];


class TranslateSlider extends Component {
    state = {
        currentIndex: 0,
        translateValue: 0,
        count: 1,
        base: 5
    };

    prevSlide = () => {
        const { currentIndex, translateValue, count } = this.state;

        if(currentIndex === 0) return;

        let coefficient;
        if(currentIndex < count) coefficient = currentIndex; else coefficient = count;

        console.log(coefficient, currentIndex);

        this.setState({
            currentIndex: currentIndex - coefficient,
            translateValue: translateValue + coefficient * this.slideWidth()
        });
    };

    nextSlide = () => {
        const { currentIndex, translateValue, count, base } = this.state;

        const g = count - base;
        const last = slidesImages.length + g - 1;
        if(currentIndex === last || (currentIndex + count) > last) return;

        let coefficient;
        const different = slidesImages.length + g - currentIndex;
        if(different - count < count) coefficient = different - count; else coefficient = count;

        console.log(different, coefficient, currentIndex);

        this.setState({
            currentIndex: currentIndex + coefficient,
            translateValue: translateValue - coefficient * this.slideWidth()
        });
    };

    slideWidth = () => document.querySelector('.TranslateSlide').clientWidth;

    render () {
        const { translateValue } = this.state;
        const styleSlider = {
            transform: `translateX(${translateValue}px)`
        };

        const slides = slidesImages.map((slide, i) =>
            <TranslateSlide key={i}>
                <img src={slide.image} alt=""/>
                <span>{slide.title}</span>
            </TranslateSlide>
        );

        return (
            <div className="TranslateSlider">
                <div className="Wrapper">
                    <div className="SlidesWrapper" style={styleSlider}>
                        {slides}
                    </div>
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

export default connect(mapStateToProps)(TranslateSlider);