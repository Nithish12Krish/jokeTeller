const button=document.getElementById('button');
const audioElement=document.getElementById('audio');
//Disable Enable button
function toggleButton()
{
    button.disabled=!button.disabled;
}

//Passing Joke to voiceRss API
function tellMe(joke)
{
    VoiceRSS.speech({
        key: '3f1eabad3ae2403ea1110a28c4a22578',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}
//Get Jokes from JOKe API
 async function getJokes()
 {
     let joke='';
     const apiUrl='https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=racist,sexist';
     try{
       const response=await fetch(apiUrl);
       const data=await response.json();
       if(data.setup)
       {
           joke=`${data.setup}...${data.delivery}`;
       }
       else{
           joke=data.joke;
       }
       //Text to speech
       tellMe(joke);
       //Disablebutton
       toggleButton();
     }catch(error)
     {
         console.log('whoops',error);
     }
 }
 //Event Listeners
 button.addEventListener('click',getJokes);
 audioElement.addEventListener('ended',toggleButton)