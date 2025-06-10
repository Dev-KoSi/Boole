// SELECTORS
const id = document.querySelector('.id-code');
const s = document.querySelector('.students');
const g = document.querySelector('.groups');
const p = document.querySelector('.proj-name');
const projNameDsply = document.querySelector('.proj-name-display')
const members = document.querySelector('.members');
const inputFields = document.querySelector('.inputs-fields');
const dsply = document.querySelector('.display');
const home = document.querySelector('.home');
const shff = document.querySelector('.shuffle');
const prnt = document.querySelector('.print')

// LOCKS
let lock = false;
let lock2 = false;
let lock3 = false;

// GENERATE FUNC CONTROL
function genFunc () {
    if(id.value && p.value && s.value && g.value !== '') {
        generate();
            
        prnt.style.display = 'block';
        
        lock2 = true;
        idCode = '';
        students = '';
        groups = '';
    } else {
        alert(`Oops! Something went wrong, kindly checkout for empty input(s) :(`)
    }
}

// GENERATE FUNC
function generate() {
    let arr = [];
    
        members.innerHTML = '';

    
    const idCode = id.value;
    const students = s.value;
    const groups = g.value;;
    const projName = p.value;

    function shuffleArr(arr) {
        let studentNum = 0;

        for (let i = 0; i < students; i++) {
            studentNum ++
            let idNum = idCode.toUpperCase() + (studentNum >99 && studentNum <=999 ? `0${studentNum}` : studentNum >9 && studentNum <= 99 ? `00${studentNum}`: studentNum <= 9 ? `000${studentNum}` : studentNum);

            arr.push({idNum})
        }
        
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [arr[i], arr[j]] = [arr[j], arr[i]]
        };

        return arr;
    };
    
    const allStudents = shuffleArr(arr);
    
    let groupNum = 1;
    let division = Math.floor(students/groups);

    console.log(division); 
    
    projNameDsply.innerHTML = projName.toUpperCase();

    members.innerHTML += `<div class="grouping">Group ${groupNum}</div>`;

    let cut = false;

    allStudents.forEach((stu) => {
        members.innerHTML += `<div class="member">${stu.idNum}</div>`;

        if((members.getElementsByTagName('div').length) % (division + 1) === 0) {
            
            groupNum ++
            
            members.innerHTML += groupNum <= groups ? `<div class="grouping">Group ${groupNum}</div>` : '';

            if(groupNum > groups && cut === false) {
                members.innerHTML += `<div class="surplus" style="color:red;">Surplus (Group ${Number(groups) + 1})</div>`;

                cut = true;
            }
            
            setTimeout(() => {
                if(members.lastElementChild.textContent.includes('Surplus')) {
                    document.querySelector('.surplus').style.display = 'none';
                }
            }, 1000)
        }                
    });
}

// TRIGGER GENERATE FUNC
document.querySelector('.gen').addEventListener('click', () => {
    genFunc();
})

document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        genFunc();
    }
});

// BACK TO HOME PAGE
home.addEventListener('click', () => {
    location.reload();
});

document.addEventListener('keydown', (e) => {
    if(e.key === 'h' && lock === true) {
        location.reload();
    }
});

// SHUFFLE GENERATED DATA
shff.addEventListener('click', () => {
    generate();
});

document.addEventListener('keydown', (e) => {
    if(e.key === 's' && lock === true) {
        generate();
    }
});

// PRINTABLE FORMAT
document.querySelector('.js-print').addEventListener('click', () => {
        lock = true;

        inputFields.style.display = 'none';
        prnt.style.display = 'none';
        home.style.display = 'block';
        shff.style.display = 'block';
        dsply.style.height = '100%';
        document.body.style.overflowY = 'auto';
});

document.addEventListener('keydown', (e) => {
    if(e.key === 'p' && lock2 === true) {
        lock = true;
        lock2 = false;

        inputFields.style.display = 'none';
        prnt.style.display = 'none';
        home.style.display = 'block';
        shff.style.display = 'block';
        dsply.style.height = '100%';
        document.body.style.overflowY = 'auto';
    }
});

// NUMBER OF STUDENTS CONTROL
s.addEventListener('input', () => {
    if(s.value > 3000){
        alert(`Number of students must not exceed 3000, thank you :)`);

        s.value = 3000;
    }
})

// ABOUT PAGE CONTROL
document.querySelector('.about-i').addEventListener('click', () => {
    if(lock3 === false) {
        document.querySelector('.about-page').style.display = 'block';

        lock3 = true;
    } else {
        document.querySelector('.about-page').style.display = 'none';

        lock3 = false;
    }
})