const id = document.querySelector('.id-code');
        const s = document.querySelector('.students');
        const g = document.querySelector('.groups');
        const members = document.querySelector('.members');


        function display() {
            let arr = [];

            function shuffleArr(arr) {
                const idCode = id.value;
                const students = s.value;
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
                console.log(arr);
                
            };
            
            const allStudents = shuffleArr(arr);

            const idCode = id.value;
            const students = s.value;
            const groups = g.value;;
            let groupNum = 1;
            let division = Math.round(students/groups);

            console.log(division);            

            members.innerHTML += `<div class="grouping">Group ${groupNum}</div>`;

            let cut = false;

            allStudents.forEach((stu) => {
                members.innerHTML += `<div class="member">${stu.idNum}</div>`;

                if((members.getElementsByTagName('div').length) % (division + 1) === 0) {
                    
                    groupNum ++
                    
                    members.innerHTML += groupNum <= groups ? `<div class="grouping">Group ${groupNum}</div>` : '';

                    if(groupNum > groups && cut === false) {
                        members.innerHTML += `<div style="color:red;">Surplus</div>`;

                        cut = true;
                    }
                }                
            })
        }

        // window.onload = () => {
        //     console.log(allStudents)
        //     display();
        // }
        
        document.querySelector('.gen').addEventListener('click', () => {
            display()
        })

        document.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') {
                display()
            }
        })
