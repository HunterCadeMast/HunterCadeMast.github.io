// We start by loading our entire document first.
document.addEventListener('DOMContentLoaded', function () {
    const terminal = document.getElementById('terminal');
    let previousCommands = [], previousIndex = 0, scrollCheck = false, scrollTimeout;

    // This checks if we are near the bottom of the page.
    function bottomCheck() {
        return terminal.scrollTop + terminal.clientHeight >= terminal.scrollHeight - 5;
    }

    // Here, we are checking if we scroll. If so, we want to stop following our input line. Else, start following it again after 60 seconds.
    terminal.addEventListener('scroll', function () {
        if (!bottomCheck()) {
            scrollCheck = true;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => { scrollCheck = false; }, 60000);
        }
        else {
            scrollCheck = false;
        }
    });

    // Here, we print each line character by character.
    function linePrinter(html, i, element, buffer = '', callback) {
        if (i < html.length) {
            buffer += html.charAt(i);
            element.innerHTML = buffer;
            if (!scrollCheck) {
                element.scrollIntoView({ behavior: 'smooth' });
                terminal.scrollTop = terminal.scrollHeight;
            }
            i++;
            setTimeout(() => linePrinter(html, i, element, buffer, callback), 1);
        } 
        else if (callback) {
            callback();
        }
    }

    // Here, we display our welcome message and use the line printer to display it.
    function displayWelcomeMessageStart() {
        const welcomeMessage1 = document.createElement('div');
        const welcomeMessage2 = document.createElement('div');
        welcomeMessage1.className = 'welcome-message indent';
        welcomeMessage2.className = 'welcome-message indent';
        terminal.appendChild(welcomeMessage1);
        terminal.appendChild(welcomeMessage2);
        const welcomeText = 
`<pre><span class="mountain">                                                               <span class="building">*******</span>
                                                ~             <span class="building">*---*******</span>
                                                ~            <span class="building">*-----*******</span>
                                        ~                   <span class="building">*-------*******</span>
                                      __      _   <span class="building">_!__</span>     <span class="building">*-------*******</span>
                                 _   /  \\_  _/ \\  <span class="building">|::| ___</span> <span class="building">**-----********</span>   ~
                               _/ \\_/^    \\/   ^\\/<span class="building">|::|\\|:|</span>  <span class="building">**---*****</span>/^\\_                   
                            /\\/  ^ /  ^    / ^ <span class="building">___|::|_|:|__</span>/\\_<span class="building">******</span>/  ^  \\
                           /  \\  _/ ^ ^   /    <span class="building">|::|--|:|---|</span>  \\__/  ^     ^\\___
                         _/_^  \\/  ^    _/ ^   <span class="building">|::|::|:|-::|</span> ^ /_  ^    ^  ^   \\_
                         /   \\^ /    /\\ /      <span class="building">|::|--|:|:--|</span>  /  \\        ^      \\
                        /     \\/    /  /       <span class="building">|::|::|:|:-:|</span> / ^  \\  ^      ^     \\
                  <span class="car">_Q</span>   / <span class="car">_Q</span>  <span class="car">_Q _Q</span>  /<span class="car">_Q</span>    <span class="car">_Q</span>  <span class="building">|::|::|:|:::|</span>/    ^ \\     <span class="car">_Q</span>      ^
                 <span class="car">/_\\)   /_\\)/_/\\\\)  /_\\)  /_\\)</span> <span class="building">|::|::|:|:::|</span>            <span class="car">/_\\)</span>
                <span class="building">_</span><span class="tire">O|/O</span><span class="building">___</span><span class="tire">O|/O</span><span class="building">_</span><span class="tire">OO|/O</span><span class="building">__</span><span class="tire">O|/O</span><span class="building">__</span><span class="tire">O|/O</span><span class="building">__________________________</span><span class="tire">O|/O</span><span class="building">__________</span>
                <span class="building">//////////////////////////////////////////////////////////////////////</span></span></pre>`;
        welcomeMessage1.innerHTML = welcomeText;
        const helpText = 
`<pre><span class="welcome-name"> __  __     __  __     __   __     ______   ______     ______        __    __     ______     ______     ______ 
/\\ \\_\\ \\   /\\ \\/\\ \\   /\\ "-.\\ \\   /\\__  _\\ /\\  ___\\   /\\  == \\      /\\ "-./  \\   /\\  __ \\   /\\  ___\\   /\\__  _\\ 
\\ \\  __ \\  \\ \\ \\_\\ \\  \\ \\ \\-.  \\  \\/_/\\ \\/ \\ \\  __\\   \\ \\  __<      \\ \\ \\-./\\ \\  \\ \\  __ \\  \\ \\___  \\  \\/_/\\ \\/                                                                                                                  
 \\ \\_\\ \\_\\  \\ \\_____\\  \\ \\_\\\\"\\_\\    \\ \\_\\  \\ \\_____\\  \\ \\_\\ \\_\\     \\ \\_\\ \\ \\_\\  \\ \\_\\ \\_\\  \\/\\_____\\    \\ \\_\\ 
  \\/_/\\/_/   \\/_____/   \\/_/ \\/_/     \\/_/   \\/_____/   \\/_/ /_/      \\/_/  \\/_/   \\/_/\\/_/   \\/_____/     \\/_/ </span>

<span class="output">Hello and welcome to my portfolio in a terminal!
Type '<span class="keyword">help</span>' to get started or for all options!</span></pre>
`
        linePrinter(helpText, 0, welcomeMessage2);
        terminal.appendChild(document.createElement('br'));
    }

    function displayWelcomeMessage() {
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'welcome-message indent';
        terminal.appendChild(welcomeMessage);
        const welcomeText = 
`<pre><span class="mountain">                                                               <span class="building">*******</span>
                                                ~             <span class="building">*---*******</span>
                                                ~            <span class="building">*-----*******</span>
                                        ~                   <span class="building">*-------*******</span>
                                      __      _   <span class="building">_!__</span>     <span class="building">*-------*******</span>
                                 _   /  \\_  _/ \\  <span class="building">|::| ___</span> <span class="building">**-----********</span>   ~
                               _/ \\_/^    \\/   ^\\/<span class="building">|::|\\|:|</span>  <span class="building">**---*****</span>/^\\_                   
                            /\\/  ^ /  ^    / ^ <span class="building">___|::|_|:|__</span>/\\_<span class="building">******</span>/  ^  \\
                           /  \\  _/ ^ ^   /    <span class="building">|::|--|:|---|</span>  \\__/  ^     ^\\___
                         _/_^  \\/  ^    _/ ^   <span class="building">|::|::|:|-::|</span> ^ /_  ^    ^  ^   \\_
                         /   \\^ /    /\\ /      <span class="building">|::|--|:|:--|</span>  /  \\        ^      \\
                        /     \\/    /  /       <span class="building">|::|::|:|:-:|</span> / ^  \\  ^      ^     \\
                  <span class="car">_Q</span>   / <span class="car">_Q</span>  <span class="car">_Q _Q</span>  /<span class="car">_Q</span>    <span class="car">_Q</span>  <span class="building">|::|::|:|:::|</span>/    ^ \\     <span class="car">_Q</span>      ^
                 <span class="car">/_\\)   /_\\)/_/\\\\)  /_\\)  /_\\)</span> <span class="building">|::|::|:|:::|</span>            <span class="car">/_\\)</span>
                <span class="building">_</span><span class="tire">O|/O</span><span class="building">___</span><span class="tire">O|/O</span><span class="building">_</span><span class="tire">OO|/O</span><span class="building">__</span><span class="tire">O|/O</span><span class="building">__</span><span class="tire">O|/O</span><span class="building">__________________________</span><span class="tire">O|/O</span><span class="building">__________</span>
                <span class="building">//////////////////////////////////////////////////////////////////////</span>                  </span><span class="welcome-name">
 __  __     __  __     __   __     ______   ______     ______        __    __     ______     ______     ______ 
/\\ \\_\\ \\   /\\ \\/\\ \\   /\\ "-.\\ \\   /\\__  _\\ /\\  ___\\   /\\  == \\      /\\ "-./  \\   /\\  __ \\   /\\  ___\\   /\\__  _\\ 
\\ \\  __ \\  \\ \\ \\_\\ \\  \\ \\ \\-.  \\  \\/_/\\ \\/ \\ \\  __\\   \\ \\  __<      \\ \\ \\-./\\ \\  \\ \\  __ \\  \\ \\___  \\  \\/_/\\ \\/                                                                                                                  
 \\ \\_\\ \\_\\  \\ \\_____\\  \\ \\_\\\\"\\_\\    \\ \\_\\  \\ \\_____\\  \\ \\_\\ \\_\\     \\ \\_\\ \\ \\_\\  \\ \\_\\ \\_\\  \\/\\_____\\    \\ \\_\\ 
  \\/_/\\/_/   \\/_____/   \\/_/ \\/_/     \\/_/   \\/_____/   \\/_/ /_/      \\/_/  \\/_/   \\/_/\\/_/   \\/_____/     \\/_/ </span>

<span class="output">Hello and welcome to my portfolio in a terminal!
Type '<span class="keyword">help</span>' to get started or for all options!</span></pre>`;
        linePrinter(welcomeText, 0, welcomeMessage);
        terminal.appendChild(document.createElement('br'));
    }

    // Here, we give input into our command line that will be read.
    function commandLine() {
        const input = document.createElement('div');
        input.className = 'input';
        // We create our prompt for input.
        const prompt = document.createElement('span');
        prompt.className = 'prompt';
        prompt.innerText = 'guest@huntermast.com:~$ ';
        // Here, we create the text box for input.
        const commandInput = document.createElement('input');
        commandInput.type = 'text';
        commandInput.className = 'command-input';
        commandInput.autofocus = true;
        // We add the prompt and textbox to our input and then add both to the terminal together.
        input.appendChild(prompt);
        input.appendChild(commandInput);
        terminal.appendChild(input);
        // Here, we listen for if we hit enter and can reach previous commmands we have already executed.
        commandInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                const command = commandInput.value.trim();
                if (command) {
                    previousCommands.push(command);
                    if (previousCommands.length > 25) {
                        previousCommands.shift();
                    }
                    previousIndex = previousCommands.length;
                    const executedLine = document.createElement('div');
                    executedLine.className = 'input executed';
                    executedLine.innerHTML = `<span class="prompt">${prompt.innerText}</span><span class="command-text">${command}</span>`;
                    terminal.replaceChild(executedLine, input);
                    scrollCheck = false;
                    commandExecution(command);
                    commandLine();
                    if (!scrollCheck) {
                        terminal.scrollTop = terminal.scrollHeight;
                    }
                }
            }
            else if (event.key === 'ArrowUp') {
                if (previousIndex > 0) {
                    previousIndex--;
                    commandInput.value = previousCommands[previousIndex];
                }
            }
            else if (event.key === 'ArrowDown') {
                if (previousIndex < previousCommands.length - 1) {
                    previousIndex++;
                    commandInput.value = previousCommands[previousIndex];
                }
                else {
                    commandInput.value = '';
                    previousIndex = previousCommands.length;
                }
            }
        });
        commandInput.focus();
    }

    // Here, we execute our commands depending on what input is given.
    function commandExecution(command) {
        const output = document.createElement('div');
        output.className = 'output indent';
        const lowerCommand = command.toLowerCase();
        const helpList =
            `
<span class="keyword">about</span>               ~         Learn more about Hunter Mast\n
<span class="keyword">socials</span>             ~         List of social networks\n
<span class="keyword">email</span>               ~         Contact Hunter Mast directly through email\n
<span class="keyword">experience</span>          ~         See what Hunter has been up to\n
<span class="keyword">projects</span>            ~         See what Hunter has been working on\n
<span class="keyword">welcome</span>             ~         Display welcome message again (If you really want to...)\n
<span class="keyword">help</span>                ~         Display this list (You are here...)\n
<span class="keyword">previous</span>            ~         Display all of your hard work in this terminal\n
<span class="keyword">clear</span>               ~         Destroy all of your hard work in this terminal
            `;
        const socialsList = 
            `
LinkedIn            ~         Link: <a href="https://www.linkedin.com/in/huntercademast/" target="_blank">LinkedIn\\HunterCadeMast</a>\n
GitHub              ~         Link: <a href="https://github.com/HunterCadeMast" target="_blank">GitHub\\HunterCadeMast</a>
            `;
        const projectList = 
            `
Type '<span class="keyword">project[NUMBER]</span>' for a description of a specific project:\n

Project 1           ~         Link: <a href="https://github.com/HunterCadeMast/QuantumRayTracer" target="_blank">Quantum Ray Tracer</a>\n
Project 2           ~         Link: <a href="https://github.com/HunterCadeMast/automated-farming" target="_blank">Automated Farming Simulator</a>\n
Project 3           ~         Link: <a href="https://github.com/HunterCadeMast/DynamicEmotionRecognition" target="_blank">Dynamic Emotion Recognition Software</a>
            `;
            const aboutResponse =
            `
    Hey, I'm <span class="keyword">Hunter Mast</span>. I am an aspiring software engineer with experience in front-end development, compiler construction, 
augmented reality, quantum computing, and more. I enjoy experiementing with game engines and knowing as much as I can 
about software as possible. I earned my B.S. in Computer Science at <span class="keyword">Trevecca Nazarene University</span> in 2023 and my 
M.S. in Computer Science at <span class="keyword">Vanderbilt University</span> in 2024. Some of my personal interests include playing guitar, 
skateboarding, collecting comic books, listening to a variety of music (Primarily rock), and playing video games such 
as Final Fantasy and The Legend of Zelda.
            `;
            const emailResponse = "Email            ~         HunterCadeMast@gmail.com";
            const experienceResponse =
            `
    My professional experience comes primarily from my internship as Firefly Integrations LLC as a <span class="keyword">Software Engineering Intern</span>.
At Firefly, my role was to collaborate with a team to implement front-end interfaces for LCD screens inside of a variety of RV coaches 
from clients such as Thor, Entegra, Renegage, Coachmen, Jayco, etc. Additionally, I reviewed peers' code to provide constructive feedback 
for quality assurance and functionality. I gained experience in JavaScript, AWS, Git, and CAN bus in a professional setting. 

    More on the IT route, I have professional experience as an <span class="keyword">IT Support Consultant</span> at Trevecca Nazarene University. As a 
support consultant, my role was to manage a multitude of different areas on Trevecca's campus to support the learning infrastructure 
such as classroom technology, network, and security. I would provide technical support both with students and professors.
Mangage accounts, tickets, network related issues, and any question clients had both over call and in person. I gained experience 
in Microsoft Azure, SharePoint, Panopto, Crestron, HappyFox, and Blackboard Learn.

<span class="keyword">Programming Languages</span>:
    ~ Python (NumPy, PyTorch, Qiskit)
    ~ C++
    ~ JavaScript (NodeJS, Playwright)
    ~ C#
    ~ Rust
    ~ Scala
    ~ SQL
    ~ HTML Prolog
    ~ Racket

<span class="keyword">Hard Skills</span>:
    ~ Algorithms and Data Structures
    ~ Operating Systems
    ~ Networking
    ~ Cyber Security
    ~ Compiler Construction
    ~ Quantum Computing
    ~ Deep-Learning
    ~ Extended Mathematical Programming
    ~ Model Integrated Computing
    ~ Hybrid and Embedded Systems
    ~ Augmented Reality
    ~ Unity Engine
    ~ Unreal Engine

<span class="keyword">Soft Skills</span>:
    ~ Adaptability
    ~ Analytical Thinking
    ~ Attention to Detail
    ~ Collaboration
    ~ Communication
    ~ Technical Support
            `;
            const project1Response = 
            `
    Project 1, my <span class="keyword">Quantum Ray Tracer</span>, was created for my '<span class="keyword">Quantum Computing</span>' class at Vanderbilt University. The goal was to 
recreate a ray tracer with quantum computing elements that hopefully is more efficient than a normal ray tracer. I had started 
with a basic ray tracer that was not working correctly and fixed some lighting errors. From there, I attempted to create a 
quantum ray tracer using '<span class="keyword">Qiskit</span>'. I was successful in creating a somewhat efficient ray tracer and additionally a Monte Carlo 
ray tracer using similar quantum computing ideas. Overall, I believe this shows a lot of my problem solving skills and diversity
in my knowledge. While I may not need to use quantum computing techniques for most jobs, I was able to adapt and create a project
using a variety of techniques, both from quantum computing and from other classes.
            `;
            const project2Response = 
            `
    Project 2, my <span class="keyword">Automated Farming Simulator</span>, was created for my '<span class="keyword">Hybrid and Embedded Systems</span>' class at Vanderbilt University. 
For my project, I had started with trying to create a fully automated vehicle state machine for farming. I was shown a lot 
of the complexity of such a system. In the GitHub repo, are the instructions to run the program and some of the commands that 
are being called for each state. Descriptions of each state are included. Overall, I believe this shows a lot of my work with 
automation and attempting to use complex algorithms, such as Monte Carlo's algorithm, in a project. It shows a lot of thought 
that went into making sure this sort of system would be reliable, safe, and optimal.
            `;
            const project3Response = 
            `
    Project 3, my <span class="keyword">Dynamic Emotion Recognition Software</span>, was created for my '<span class="keyword">Deep Learning</span>' class at Vanderbilt University.
This was a group project for optimizing EfficientNet with LSTM for Dynamic Emotion Recognition from video. Collaborators consists of 
Celestine Akpanoko, Alex Esser, Srikanth Narayanan, Chang-Yong Song, and myself. In the repo, there is both a paper written by us and 
a presentation that goes over our motivation, data sets used, architecture, and results. We initially proposed an approach for 
facial emotion recognition (FER) that would utilize a hybrid model that combines LSTM netowrks with pre-trained EfficientNet architecture. 
Overall, I believe this shows a lot of my collaboration skills and my knowledge in more complex fields such as machine learning.
            `;
        if (lowerCommand === 'clear') {
            terminal.innerHTML = "";
        }
        else if (lowerCommand === 'help') {
            linePrinter(helpList, 0, output);
            terminal.appendChild(output);
        }
        else if (lowerCommand === 'about') {
            linePrinter(aboutResponse, 0, output);
            terminal.appendChild(output);
        }
        else if (lowerCommand === 'social' || lowerCommand === 'socials') {
            linePrinter(socialsList, 0, output);
            terminal.appendChild(output);
        }
        else if (lowerCommand === 'email') {
            linePrinter(emailResponse, 0, output);
            terminal.appendChild(output);
        }
        else if (lowerCommand === 'experience' || lowerCommand === 'experiences') {
            linePrinter(experienceResponse, 0, output);
            terminal.appendChild(output);
        }
        else if (lowerCommand === 'project' || lowerCommand === 'projects') {
            linePrinter(projectList, 0, output);
            terminal.appendChild(output);
        }
        else if (lowerCommand === 'project1' || lowerCommand === 'project 1') {
            linePrinter(project1Response, 0, output);
            terminal.appendChild(output);
        }
        else if (lowerCommand === 'project2' || lowerCommand === 'project 2') {
            linePrinter(project2Response, 0, output);
            terminal.appendChild(output);
        }
        else if (lowerCommand === 'project3' || lowerCommand === 'project 3') {
            linePrinter(project3Response, 0, output);
            terminal.appendChild(output);
        }
        else if (lowerCommand === 'welcome' || lowerCommand === 'message') {
            displayWelcomeMessage();
        }
        else if (lowerCommand === 'previous') {
            const historyOutput = `<span class="keyword">${previousCommands.join('\n')}</span>`;
            linePrinter(historyOutput, 0, output);
            terminal.appendChild(output);
        }
        else {
            linePrinter(`Command, '<span class="keyword">${command}</span>', not found. Use '<span class="keyword">help</span>' for a list of commands.`, 0, output);
            terminal.appendChild(output);
        }
        if (!(lowerCommand === 'welcome') || !(lowerCommand === 'message')) {
            terminal.appendChild(document.createElement('br'));
        }
        if (!scrollCheck) {
            terminal.scrollTop = terminal.scrollHeight;
        }
    }
    displayWelcomeMessageStart();
    commandLine();
});