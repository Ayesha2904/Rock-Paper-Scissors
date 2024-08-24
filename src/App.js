import { Component } from 'react';
import './App.css';
import play from '../src/assests/start-button.png';
import computer from '../src/assests/computer.gif';
import rock from '../src/assests/rock.png';
import paper from '../src/assests/paper.png';
import scissors from '../src/assests/scissors.png';
import restart from '../src/assests/restart.png';

const Whowon =(First,Second) =>{
  if(First === Second){
    return 'Tie';
  }
  switch(First){
    case 'Rock':
      if (Second === 'Scissors') {
        return First;
      }else {
        return Second;
      }
    case 'Paper':
      if (Second === 'Rock') {
        return First;
      }else {
        return Second;
      }
    case 'Scissors':
      if (Second === 'Paper') {
        return First;
      }else {
        return Second;
      }
    default:
  }
}

class App extends Component{
  state={
    Started: false,
    Player: null,
    Computer: null,
    Name: ''
  };
  render(){
    const{Started, Player, Computer,Name} =this.state; 
    const Images={
      Rock: rock,
      Paper: paper,
      Scissors: scissors
    }
    return(
      <div className='App'>
        <h1>ROCK PAPER SCISSORS </h1>
        {Started ? (
          <div className='Game'>
            <div className={'Player' + (Player ? ' selected' : '')}>
              <p>Player</p>
              {Player ? (
                <img src={Images[Player]} alt={Player}/>
              ):(
              <div className='choose'>
                {Object.keys(Images).map((a)=>(
                  <span key={a} onClick={() =>{
                    this.setState({
                      Player: a,
                      Computer: Object.keys(Images)[
                        Math.floor(
                          Math.random() * Object.keys(Images).length
                        )
                      ]
                    })
                  }}>
                    <img src={Images[a]} alt={a} />
                    {a}
                  </span>
                ))}        
              </div>)}
            </div>
            <div className='Computer'>              
              <p>Computer</p>
              {Computer ?(
                <img src={Images[Computer]} alt={Computer}/>
              ) : (
              <img src={computer} alt='computer'/>
              )}              
            </div>
          </div>
        ) : (
          <div className='Intro'>
            <input type='text' 
              value={Name}
              placeholder="Enter your name, at least 3 characters long..."
              onChange={(e) =>{
              this.setState({Name: e.target.value})
            }}/>
            {Name.trim().length>2 &&(
            <img 
              className='start' 
              src={play} 
              alt='play button'
              onClick={()=>{
                this.setState({
                  Started: true
                })
              }}
            />
          )}
          </div>
        )}
        {Player && Computer && 
          (<p className='Results'>          
          {(()=>{
            const Winner = Whowon(Player, Computer);
            if (Winner === "Tie") {
              return "Nobody Wins!";
            } else {
              if (Winner === Player) {
                return Name+" Wins!";
              } else {
                return "Computer Wins!";
              }
            }
          })()}
          <img src={restart} alt='restart'
            onClick={() =>{
              this.setState({
                Started: false,
                Player: null,
                Computer: null
              })
            }}
          /></p>
        )}       
      </div>
    );
  }
}

export default App;