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
            scrollTimeout = setTimeout(() => {
                scrollCheck = false;
            }, 60000);
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
            setTimeout(() => linePrinter(html, i, element, buffer, callback), 5);
        } 
        else if (callback) {
            callback();
        }
    }

    // Here, we display our welcome message and use the line printer to display it.
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
Type '<span class="keyword">project[NUMBER]</span>' to get more information on the projects:\n

Quantum Ray Tracer                              ~         Link: <a href="https://github.com/HunterCadeMast/QuantumRayTracer" target="_blank">Project 1</a>\n
Augmented Reality Comic Book Cover              ~         Link: <a href="https://github.com/HunterCadeMast/ComicBookARCover" target="_blank">Project 2</a>\n
COOL Compiler                                   ~         Link: <a href="https://github.com/HunterCadeMast/COOLCompiler" target="_blank">Project 3</a>
            `;
            const aboutResponse = "Hey, I'm Hunter Mast.\n";
            const emailResponse = "Email            ~         HunterCadeMast@gmail.com";
            const experienceResponse = "Experience";
            const project1Response = "Project 1";
            const project2Response = "Project 2";
            const project3Response = "Project 3";
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
    displayWelcomeMessage();
    commandLine();
});