
function Project(id,name, img ,discription, githuburl, productionurl ,vedio, type) {
    this.id = id;
    this.name = name;
    this.discription = discription;
    this.githuburl = githuburl;
    this.productionurl = productionurl;
    this.vedio = vedio;
    this.img = img;
    this.type = type;
  }
  
  let myArr = [
    new Project(1,'ecommerce angular', './img/EcommerceAngular.png' ,'this project is a ecommerce project and used angular technology ', 'https://github.com/M45CJ3J/ecommece-angular.git', null,'https://www.youtube.com/embed/kCThtzeNQpk','angular'),
    new Project(2,'ashadagroup', './img/ashadagroup.webp' ,'this project is a project for a realstate company in lebanon and used laravel and bootstrap ', null, 'https://ashadagroup.com/','https://www.youtube.com/embed/m6qHLZEXlaQ','laravel'),
    new Project(3,'xu-university', './img/xu-university.webp' ,'this project is a project for a LMS (learning mangement system ) for xu university and its website  and used laravel and bootstrap and because of GDPR I worked on a kali linux server', null, 'https://xu-university.com/','https://www.youtube.com/embed/LnFptheVK_I','laravel'),
    new Project(4,'theHUB POS', './img/thehub.jpeg' ,'this project is a POS system to mange the product and employees and thier permissions plus it designed as SaaS and used laravel and bootstrap', null, null,'https://www.youtube.com/embed/gz_4zGE0NsY','laravel'),
    new Project(5,'euro assist', './img/euroassist.webp' ,'this project is a website for a Travel Assistance Covering , it was made with nodejs', null, 'https://euro-assist.com/','https://www.youtube.com/embed/ruoc7HquQQQ','nodejs'),
    new Project(6,'edsx', './img/edxs.png' ,'this project is a website and dashboard for a swiss company for finanical services and used codeignitor', null, 'https://www.edsx.ch/','https://www.youtube.com/embed/TwbtJ9FsqUQ','codeignitor'),
    new Project(7,'abido', './img/abido.jpeg' ,'this project is a website for a spicy store in lebanon and dashboard  and used laravel in dashboard', null, 'https://www.abido.com/','https://www.youtube.com/embed/QqKXfES3oYQ','laravel'),
    new Project(8,'profitic', './img/profitic.jpeg' ,'this project is a CRM to mange clinics in USA and works a SaaS and its DB is large what makes DB Quries so hard  and used  combination between php native , laravel and angular ', null, 'https://app.profiticemr.com/administrator/index.php','https://www.youtube.com/embed/GSan4uGMvAc','laravel'),


  ]

  document.querySelector("#row").innerHTML = myArr.map(project => 
  `
  <div class="column ${project.type}" >
          <img class="project-image" src="${project.img}" width="300px" height="300px" >
          <h4 class="project-title">${project.name}</h4>
          <a href="javascript:  save(${project.id})" class="more-details">more details</a>
  </div>
  `).join('')
  
  
  function save(par) {
      var id = par -1
   // data = $.parseJSON(myArr[id])
      var arr = (myArr[id]);
     
      var name = JSON.stringify(arr.name) ;
      var discription = JSON.stringify(arr.discription) ;
      var githuburl = JSON.stringify(arr.githuburl) ;
      var productionurl = JSON.stringify(arr.productionurl) ;
      var vedio = JSON.stringify(arr.vedio) ;
  
      sessionStorage.setItem('name', name);
      sessionStorage.setItem('discription', discription);
      sessionStorage.setItem('githuburl', githuburl);
      sessionStorage.setItem('productionurl', productionurl);
      sessionStorage.setItem('vedio', vedio);
  
     
      window.open("./details.html",'_Blank');
  
  }
  