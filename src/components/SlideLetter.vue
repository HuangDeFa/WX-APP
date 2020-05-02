<template>
    <div class="slide">
        <canvas class="slide-canvas" @click="handleClick" ref="slideCanvas"></canvas>
    </div>
</template>
<script>
export default {
    name:'slide-letter',
    data() {
        return {
            letters:[],
            letterSnapShotId:'slide-letter-snap-shot',
            letterOffsetY:0,
            displayTimeerId:0
        }
    },
    created() {
        const letters='↑,✩,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,#';
        this.letters = letters.split(',');

        const rootElement = this.$root.$el;
        const ele = rootElement.querySelector("#"+this.letterSnapShotId);
        if(ele){
            rootElement.removeChild(ele);
        }
        const divElement = window.document.createElement('div');
        divElement.setAttribute("id",this.letterSnapShotId);
        divElement.innerText="A";

        const style ={
        position:'absolute',
        left:'50%',
        top:'50%',
        transform:'translate(-50%, -50%)',
        'background-color':'rgba(77, 74, 74, 0.51)',
        color: 'white',
        height: '10vh',
        width: '10vh',
        'border-radius':'10%',
        display:'flex',
        'justify-content':'center',
        'align-items':'center',
        'font-family':'sans-serif'
        }
        Object.keys(style).forEach(key=>{
            divElement.style[key]=style[key];
        });
        divElement.style.display="none";
        rootElement.appendChild(divElement);
    },
    mounted() {
        this.$nextTick(()=>{
           this.renderLetters();
        });
        window.addEventListener("resize",(s,e)=>{
            this.renderLetters();
        });
    },
    methods: {
        renderLetters(){
            const ele = this.$refs.slideCanvas;
            const context = ele.getContext('2d');
            const ratio = window.devicePixelRatio;
            if(context){
                const h = ele.clientHeight;
                const w = ele.clientWidth;
                context.canvas.height =ratio*h;
                context.canvas.width =ratio*w;
                context.textBaseline="top";
                context.fillStyle="$4d4a4ae7";
                context.font=`${ratio*10}px sans-serif`;
                context.clearRect(0,0,context.canvas.width,context.canvas.height);

                const size = this.letterOffsetY = (h*ratio)/ this.letters.length;
                this.letters.forEach((letter,index)=>{
                    const{ width ,actualBoundingBoxDescent , actualBoundingBoxAscent} = context.measureText(letter);
                    const x = Math.max((ratio*w-width)/2,0);
                    const y = Math.max((size - (actualBoundingBoxDescent - actualBoundingBoxAscent))/2,0);
                    context.fillText(letter,x,index*size+y);
                });
            }
        },
        handleClick(e){
            if(this.letterOffsetY){
               const y = e.offsetY*window.devicePixelRatio;
               const index =Math.floor(y / this.letterOffsetY);
               const ele = this.$root.$el.querySelector("#"+this.letterSnapShotId);
               if(index<this.letters.length && ele){
                   //console.log("select letter->",this.letters[index]);
                   ele.innerText = this.letters[index];
                   if(ele.style.display=='none'){
                       ele.style.display='flex';
                       this.displayTimeerId = setTimeout(() => {
                           ele.style.display='none';
                       }, 1000);
                   }else{
                       if(ele.innerText===this.letters[index])return;
                       clearTimeout(this.displayTimeerId);
                       this.displayTimeerId = setTimeout(() => {
                           ele.style.display='none';
                       }, 1000);
                   }
                   this.$emit("letterChange",index,this.letters[index]);
               }
            }
        }
    },
    destroyed() {
        const rootElement = this.$root.$el;
        const ele = rootElement.querySelector("#"+this.letterSnapShotId);
        if(ele){
            ele.remove();
        }
    }
}
</script>
<style lang="scss" scoped>
    .slide{
        height: 100%;
        width: fit-content;
    }
    .slide:active{
        background-color:$primary_background_color;
    }
    .slide-canvas{
        height: 100%;
        width: 5vw;
    }
</style>