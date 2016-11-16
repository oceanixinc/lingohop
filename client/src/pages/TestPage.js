import React from 'react'

export default class TestPage extends React.Component {

    render() {

        return (
            <div>
                <canvas id="can" width="37" height="37"/>
            </div>
        )
    }

    componentDidMount(){
      var canvas = document.getElementById("can");
var ctx = canvas.getContext("2d");
var lastend = 0;
var data = [1,1,2,1];
var myTotal = 0;
var myColor = ['#4e4e4e','#d5d5d5','#EAC66B', '#ed8f2a'];

for(var e = 0; e < data.length; e++)
{
  myTotal += data[e];
}

for (var i = 0; i < data.length; i++) {
  ctx.fillStyle = myColor[i];
  ctx.beginPath();
  ctx.moveTo(canvas.width/2,canvas.height/2);
  ctx.arc(canvas.width/2,canvas.height/2,canvas.height/2,lastend,lastend+(Math.PI*2*(data[i]/myTotal)),false);
  ctx.lineTo(canvas.width/2,canvas.height/2);
  ctx.fill();
  lastend += Math.PI*2*(data[i]/myTotal);
}

ctx.fillStyle = 'rgba(255,255,255,0.80)';
ctx.beginPath();
//ctx.moveTo(canvas.width/2, canvas.height/2);
ctx.arc(canvas.width/2, canvas.height/2, 15, 0, 360, false);
ctx.fill();
ctx.stroke();
ctx.fillStyle = '#333'
ctx.font = "20px sans-serif";
ctx.textAlign="center";
ctx.textBaseline = "middle";
ctx.fillText(myTotal, canvas.width/2, canvas.height/2+2, canvas.width-11);
    }
}
