// 首页轮播图
import React, {Component} from 'react';
import SnapCarousel, {
  ParallaxImage,
  Pagination,
} from 'react-native-snap-carousel';
import {StyleSheet, View} from 'react-native';
import {viewportWidth, wp, hp} from '@/utils/util';
import {ICarousel} from '@/models/home';

const sliderWidth = viewportWidth;
const itemWidth = wp(90) + wp(2) * 2;
const itemHeight = hp(26);
interface IProps {
  carousels: ICarousel[];
}

class Carousel extends Component<IProps> {
  state = {
    activeSlide: 0,
  };

  get pagination() {
    const {activeSlide} = this.state;
    const {carousels} = this.props;
    return (
      <View style={styles.paginationWrapper}>
        <Pagination
          dotsLength={carousels.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotContainerStyle={styles.dotContainer}
          dotStyle={styles.dotStyle}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.8}
        />
      </View>
    );
  }

  onSnapToItem = (slideIndex: number) => {
    this.setState({activeSlide: slideIndex});
  };

  renderItem = ({item}: {item: ICarousel}, parallaxData: any) => {
    return (
      <ParallaxImage
        source={{uri: item.image}}
        style={styles.image}
        containerStyle={styles.imageContainer}
        parallaxFactor={0.35} // 视差效果的速度
        showSpinner
        spinnerColor="rgba(0,0,0,0.25)"
        {...parallaxData}
      />
    );
  };

  render() {
    const {carousels} = this.props;
    return (
      <View>
        <SnapCarousel
          data={carousels}
          renderItem={this.renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages
          onSnapToItem={this.onSnapToItem}
          loop
          autoplay
          vertical={false}
        />
        {this.pagination}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {width: itemWidth, height: itemHeight, borderRadius: 8},
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  paginationWrapper: {justifyContent: 'center', alignItems: 'center'},
  paginationContainer: {
    position: 'absolute',
    top: -20,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    paddingHorizontal: 3,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dotContainer: {
    marginHorizontal: 6,
  },
  dotStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
});

export default Carousel;
