let editor = document.getElementById('editor'),
        cursor = document.getElementById('cursor'),
        content, count = 0;


    autosize(editor);
    editor.focus();
    previewMode();
    getCursor(editor);

    editor.addEventListener('keydown', function(e) {

        setTimeout(function() {

            content = editor.value;
            count = content.length;

            console.log(e.keyCode)


            getCursor(editor);
            if (e.keyCode > 48 && e.keyCode < 91 || e.keyCode === 229) setFade();
            preview.innerHTML = marked(content);

        }, 0)

        if (e.keyCode === 13) {
            if (!content || editor.selectionStart === 0) {
                console.warn('ENTER when no content');
                e.preventDefault();
                return false;
            }


            if (JSON.stringify(content.slice(editor.selectionStart - 1, editor.selectionStart)) == '"\\n\"') {
                console.warn('ENTER at an empty line');
                e.preventDefault();
                return false;
            }
            return true;
        }




        if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {

            if (JSON.stringify(content.slice(editor.selectionStart - 1, editor.selectionStart)) == '"\\n\"') {
                console.warn('move');
                e.preventDefault();
                return false;
            }
            return true;
        }

        if ((e.ctrlKey && e.keyCode === 65) || (e.shiftKey && e.keyCode < 41 && e.keyCode > 37) || !e.shiftKey && !e.ctrlKey) {
            editMode();
        }



        if (!e.shiftKey && !e.ctrlKey && preview.style.display == 'none' || preview.style.display == '') {
            previewMode();
        }



        if (editor.selectionStart === count) {
            setTimeout(function() {
                document.documentElement.scrollTop = document.documentElement.scrollHeight;
            }, 0)
            return true;
        }

    })


    document.addEventListener('mousedown', function() {
        editMode(); 
    })


    window.addEventListener('resize', function() {
        getCursor(editor);
    })


    function getCursor(elem) {
        let p = kingwolfofsky.getInputPositon(elem);

        cursor.style.top = (p.top + 10) + 'px';
        cursor.style.left = p.left + 'px';

        if (editor.selectionStart !== count) {
            cursor.innerHTML = "|";
        } else {
            cursor.innerHTML = "█";
        }

    }

    function setFade() {
        let top = cursor.style.top,
            left = (parseInt(cursor.style.left) - 14) + 'px',
            ele = document.createElement('span'),
            timeStamp = new Date().getTime();

        ele.id = 'fade' + timeStamp;
        ele.style.cssText = 'display:inline-block;position:absolute;top:' + top + ';left:' + left + ';transition:opacity 0.5s;width:24px;height:28px;background:#000';

        document.body.appendChild(ele);


        setTimeout(function() {
            document.getElementById(ele.id).style.opacity = 0;
        }, 0)

        setTimeout(function() {
            document.body.removeChild(document.getElementById(ele.id))
        }, 500)

    }

    function editMode() {
        cursor.style.visibility = 'hidden';
        editor.style.opacity = '1';
        preview.style.display = 'none';
    }

    function previewMode() {
        cursor.style.visibility = 'visible';
        editor.style.opacity = '0';
        preview.style.display = 'block';
    }