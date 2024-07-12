$(() => {

    $('#search-inp').on('click', () => {
        let query = $('input:text').val()
        if (query !== '') {
            let qURL = 'https://superhero-search.p.rapidapi.com/api/?hero=' + query;
            const settings = {
                async: true,
                crossDomain: true,
                url: qURL,
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '3cb5a109f4msh460620cd7f1888fp11b688jsn5cc925f2565b',
                    'X-RapidAPI-Host': 'superhero-search.p.rapidapi.com'
                }
            };

            $.ajax(settings).done(function (response) {
                let res = JSON.parse(response);
                console.log(res);
                if (res) {
                    console.log($('#SuperHeroInfo').has('.result-box')['length'])
                    if ($('#SuperHeroInfo').has('.result-box')['length'] > 0) {
                        $(".result").empty();
                        showHeroInfo(res);
                    } else {
                        showHeroInfo(res);
                    }
                }
            });
        } else {
            alert('Please enter superhero name first!!!!');
        }
    });

    $('#shh-Home').on('click', () => {
        location.reload();
    });

    function showHeroInfo(res) {

        let $root = document.createElement('div');
        $root.className = "result-box w-3/4 h-fit bg-blue-900 rounded-xl shadow-xl flex space-x-2 p-2";

        let $rootsChild1 = document.createElement('div');
        $rootsChild1.className = "hero-img rounded-xl overflow-hidden";

        let $child1IMG = document.createElement('img');
        $child1IMG.src = res['images']['md'];
        $child1IMG.className = "w-66"

        let $rootsChild2 = document.createElement('div');
        $rootsChild2.className = "hero-info w-full h-max p-2 flex-col rounded-xl font-bold text-white";

        let $child2INFO = document.createElement('div');
        $child2INFO.className = "m-4 flex-col space-y-4";

        let $name = document.createElement('h2');
        let $nameData = document.createElement('span');
        $name.innerHTML = "Name: "
        $nameData.innerHTML = res['name'];
        $nameData.id = "hero-name"
        $name.appendChild($nameData);

        let $base = document.createElement('h2');
        $base.innerHTML = "Base: ";
        let $baseData = document.createElement('span');
        $baseData.innerHTML = res['work']['base'];
        $baseData.id = "hero-base";
        $base.appendChild($baseData);

        let $occupation = document.createElement('h2');
        $occupation.innerHTML = "Occupation: ";
        let $occupationData = document.createElement('span');
        $occupationData.innerHTML = res['work']['occupation'];
        $occupationData.id = "hero-occupation";
        $occupation.appendChild($occupationData);


        let $child2BUTTON = document.createElement('div');
        $child2BUTTON.className = "flex space-x-6 m-4 w-full justify-center";
        // let $favouriteBUTTON = document.createElement('button');
        // $favouriteBUTTON.className = "p-3 w-36 rounded-md bg-[#457b9d] hover:bg-[#a8dadc] hover:text-[#457b9d] hover:border-2";
        // $favouriteBUTTON.innerHTML = "Favourite";
        // $favouriteBUTTON.onclick = (res) => {addToFavourite(res)} 

        let $viewmoreBUTTON = document.createElement('button');
        $viewmoreBUTTON.className = "p-3 w-36 rounded-md bg-[#457b9d] hover:bg-[#a8dadc] hover:text-[#457b9d] hover:border-2";
        $viewmoreBUTTON.innerHTML = "View more";
        $viewmoreBUTTON.onclick = () => { showFullInfo(res) };

        $child2INFO.appendChild($name);
        $child2INFO.appendChild($base);
        $child2INFO.appendChild($occupation);

        // $child2BUTTON.appendChild($favouriteBUTTON);
        $child2BUTTON.appendChild($viewmoreBUTTON);

        $rootsChild1.appendChild($child1IMG);

        $rootsChild2.appendChild($child2INFO);
        $rootsChild2.appendChild($child2BUTTON);

        $root.appendChild($rootsChild1);
        $root.appendChild($rootsChild2);
        $('#SuperHeroInfo').append($root);

    }

    function showFullInfo(res) {
        // console.log(res);
        $('main').empty();

        let $root = document.createElement('section');
        $root.className = "text-gray-600 body-font mb-10";

        let $mainChild = document.createElement('div');
        $mainChild.className = "container mx-auto flex px-5 py-16 md:flex-row flex-col items-center bg-gray-200 shadow-xl rounded-2xl";

        let $innerDiv1 = document.createElement('div');
        $innerDiv1.className = "lg:max-w-lg lg:w-full lg:pl-20 md:w-2/2 w-5/6 mb-10 md:mb-0";

        let $hIMG = document.createElement('img');
        $hIMG.className = "object-cover object-center rounded";
        $hIMG.src = res['images']['md'];

        let $innerDiv2 = document.createElement('div');
        $innerDiv2.className = "lg:flex-grow md:w-1/2 flex flex-col md:items-start md:text-left items-center text-center";

        let h1Classname = "text-2xl font-bold"
        let $h_Name = document.createElement('h1');
        $h_Name.className = h1Classname;
        $h_Name.innerHTML = "Name: ";
        let $spanName = document.createElement("span");
        $spanName.innerHTML = res['name'];
        $h_Name.appendChild($spanName);

        let $h_FullName = document.createElement('h1');
        $h_FullName.className = h1Classname;
        $h_FullName.innerHTML = "Fullname: "
        let $spanFullname = document.createElement("span");
        $spanFullname.innerHTML = res['biography']['fullName'];
        $h_FullName.appendChild($spanFullname);

        let $h_Powerstat = document.createElement('h1');
        $h_Powerstat.className = h1Classname;
        $h_Powerstat.innerHTML = "Powerstats: ";
        let $ul = document.createElement("ul");
        $ul.className = "ml-8";
        let $li1 = document.createElement('li');
        $li1.innerHTML = "Combat: ";
        let $spanLi1 = document.createElement('span');
        $spanLi1.innerHTML = res['powerstats']['combat'];
        $li1.appendChild($spanLi1);

        let $li2 = document.createElement('li');
        $li2.innerHTML = "Durability: ";
        let $spanLi2 = document.createElement('span');
        $spanLi2.innerHTML = res['powerstats']['durability'];
        $li2.appendChild($spanLi2);

        let $li3 = document.createElement('li');
        $li3.innerHTML = "Intelligence: ";
        let $spanLi3 = document.createElement('span');
        $spanLi3.innerHTML = res['powerstats']['intelligence'];
        $li3.appendChild($spanLi3);

        let $li4 = document.createElement('li');
        $li4.innerHTML = "Power: ";
        let $spanLi4 = document.createElement('span');
        $spanLi4.innerHTML = res['powerstats']['power'];
        $li4.appendChild($spanLi4);

        let $li5 = document.createElement('li');
        $li5.innerHTML = "Speed ";
        let $spanLi5 = document.createElement('span');
        $spanLi5.innerHTML = res['powerstats']['speed'];
        $li5.appendChild($spanLi5);

        let $li6 = document.createElement('li');
        $li6.innerHTML = "Strength ";
        let $spanLi6 = document.createElement('span');
        $spanLi6.innerHTML = res['powerstats']['strength'];
        $li6.appendChild($spanLi6);

        $ul.appendChild($li1);
        $ul.appendChild($li2);
        $ul.appendChild($li3);
        $ul.appendChild($li4);
        $ul.appendChild($li5);
        $ul.appendChild($li6);
        $h_Powerstat.appendChild($ul);

        let $h_Relative = document.createElement('h1');
        $h_Relative.className = h1Classname;
        $h_Relative.innerHTML = "Relative: ";
        let $spanRelative = document.createElement('span');
        $spanRelative.innerHTML = res['connections']['relatives'];
        $h_Relative.appendChild($spanRelative);

        let $h_Publisher = document.createElement('h1');
        $h_Publisher.className = h1Classname;
        $h_Publisher.innerHTML = "Publisher: ";
        let $spanPublisher = document.createElement('span');
        $spanPublisher.innerHTML = res['biography']['publisher'];
        $h_Publisher.appendChild($spanPublisher);


        $innerDiv1.appendChild($hIMG);
        $innerDiv2.appendChild($h_Name);
        $innerDiv2.appendChild($h_FullName);
        $innerDiv2.appendChild($h_Powerstat);
        $innerDiv2.appendChild($h_Relative);
        $innerDiv2.appendChild($h_Publisher);

        $mainChild.appendChild($innerDiv1);
        $mainChild.appendChild($innerDiv2);

        $root.appendChild($mainChild);
        $('main').append($root)
    }

});
