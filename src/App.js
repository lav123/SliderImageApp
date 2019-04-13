import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [],
      currentIndex: 0,
      translateValue: 0,
      intervalTime:1000,
    }
    this.goToPrevSlide = () => {
    if(this.state.currentIndex === 0)
    {
      //console.log((this.state.images.length-1)*600);
      return this.setState({
      currentIndex:this.state.images.length-1,
        translateValue:-((this.state.images.length-1)*600)
      })

    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1,
      translateValue: prevState.translateValue +this.slideWidth()
    }))
  }
  this.goToNextSlide = () => {
    if(this.state.currentIndex === this.state.images.length - 1) {
      return this.setState({
        currentIndex: 0,
        translateValue: 0
      })
    }
    
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
      translateValue: prevState.translateValue + -(this.slideWidth())
    }));
   // console.log("translateValue:"+ this.state.images);
  }

  this.slideWidth = () => {
     return document.querySelector('.slide').clientWidth
  }
   setInterval(() => {
      this.goToNextSlide();
     }, this.state.intervalTime);
}
  componentDidMount() { 
  const token = "fc1be0ce7f79cfe74502163bbc76613e"
 const URL="https://screeningtest.vdocipher.com/api/image/"
 const AuthStr = 'Bearer '.concat(token);
 axios.get(URL, { headers: { Authorization: AuthStr } })
 .then(response => {
   const obj =response.data;
   for (var i = 0; i < obj.length; i++) {
   // console.log(obj[i].id);    
    axios.post("https://screeningtest.vdocipher.com/api/image/"+obj[i].id,obj[i].id,{
    headers: { Authorization: "Bearer " + token }
}).then(response => {
      this.state.images.push(response.data)
      this.setState(
      this.state
    )
   // console.log(this.state.photos)
   })   
   .catch((error) => {
      console.log('error ' + error);   
   });
   }
     
  })
 .catch((error) => {
     console.log('error ' + error);
  });
}

  render() {
    return (
    <div className="slider">
      <h1 className="App-title">Avengers avenue </h1>
        <div className="slider-wrapper"
          style={{
            transform: `translateX(${this.state.translateValue}px)`,
            transition: 'transform ease-out 0.45s'
          }}>
            {
              this.state.images.map((image, i) => (
                <Slide key={image.id} image={image.url} />
              ))
            }
        </div>

        <LeftArrow
         goToPrevSlide={this.goToPrevSlide}
        />

        <RightArrow
         goToNextSlide={this.goToNextSlide}
        />
      </div>
    );
  }
}


const Slide = ({ image }) => {
  const styles = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
   backgroundPosition: '50% 60%'
  }
  return <div className="slide" style={styles}></div>
}


const LeftArrow = (props) => {
  return (
    <div className="backArrow arrow" onClick={props.goToPrevSlide}>
      <i className="prev-button" aria-hidden="true"></i>
    </div>
  );
}


const RightArrow = (props) => {
  return (
    <div className="nextArrow arrow" onClick={props.goToNextSlide}>
      <i className="next-button" aria-hidden="true"></i>
    </div>
  );
}
export default App;
