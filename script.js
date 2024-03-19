'use strict';

let listenerController = new AbortController();

let storageKey = 'name-matcher-scores';

let previous = localStorage.getItem(storageKey);
if (previous) {
  try {
    let scores = parseScores(previous);
    loadCards(scores);
  } catch (e) {
    console.error(e);
    loadIntro();
  }
} else {
  loadIntro();
}

function parseScores(text) {
  let res = JSON.parse(text);
  if (typeof res !== 'object' || Array.isArray(res) || Object.values(res).some(v => ![-1, 0, 1].includes(v))) {
    throw new Error('bad data');
  }
  return res;
}

function clearState() {
  listenerController.abort();
  listenerController = new AbortController();
  document.getElementById('intro').style.display = 'none';
  document.getElementById('cardContainer').style.display = 'none';
  document.getElementById('results').style.display = 'none';
}

function readFile(file) {
  return new Promise(res => {
    let reader = new FileReader();
    reader.onload = readerEvent => {
      res(readerEvent.target.result);
    };
    reader.readAsText(file);
  });
}

let overlay = document.getElementById('overlay');

// --- intro

function loadIntro() {
  clearState();
  document.getElementById('intro').style.display = 'initial';

  // from https://www.ssa.gov/oact/babynames/
  // copy(JSON.stringify([...document.querySelectorAll('tr[align=right]')].map(tr => tr.querySelectorAll('td')[1].textContent)))
  // prettier-ignore
  let male = ["Liam","Noah","Oliver","James","Elijah","William","Henry","Lucas","Benjamin","Theodore","Mateo","Levi","Sebastian","Daniel","Jack","Michael","Alexander","Owen","Asher","Samuel","Ethan","Leo","Jackson","Mason","Ezra","John","Hudson","Luca","Aiden","Joseph","David","Jacob","Logan","Luke","Julian","Gabriel","Grayson","Wyatt","Matthew","Maverick","Dylan","Isaac","Elias","Anthony","Thomas","Jayden","Carter","Santiago","Ezekiel","Charles","Josiah","Caleb","Cooper","Lincoln","Miles","Christopher","Nathan","Isaiah","Kai","Joshua","Andrew","Angel","Adrian","Cameron","Nolan","Waylon","Jaxon","Roman","Eli","Wesley","Aaron","Ian","Christian","Ryan","Leonardo","Brooks","Axel","Walker","Jonathan","Easton","Everett","Weston","Bennett","Robert","Jameson","Landon","Silas","Jose","Beau","Micah","Colton","Jordan","Jeremiah","Parker","Greyson","Rowan","Adam","Nicholas","Theo","Xavier","Hunter","Dominic","Jace","Gael","River","Thiago","Kayden","Damian","August","Carson","Austin","Myles","Amir","Declan","Emmett","Ryder","Luka","Connor","Jaxson","Milo","Enzo","Giovanni","Vincent","Diego","Luis","Archer","Harrison","Kingston","Atlas","Jasper","Sawyer","Legend","Lorenzo","Evan","Jonah","Chase","Bryson","Adriel","Nathaniel","Arthur","Juan","George","Cole","Zion","Jason","Ashton","Carlos","Calvin","Brayden","Elliot","Rhett","Emiliano","Ace","Jayce","Graham","Max","Braxton","Leon","Ivan","Hayden","Jude","Malachi","Dean","Tyler","Jesus","Zachary","Kaiden","Elliott","Arlo","Emmanuel","Ayden","Bentley","Maxwell","Amari","Ryker","Finn","Antonio","Charlie","Maddox","Justin","Judah","Kevin","Dawson","Matteo","Miguel","Zayden","Camden","Messiah","Alan","Alex","Nicolas","Felix","Alejandro","Jesse","Beckett","Matias","Tucker","Emilio","Xander","Knox","Oscar","Beckham","Timothy","Abraham","Andres","Gavin","Brody","Barrett","Hayes","Jett","Brandon","Joel","Victor","Peter","Abel","Edward","Karter","Patrick","Richard","Grant","Avery","King","Caden","Adonis","Riley","Tristan","Kyrie","Blake","Eric","Griffin","Malakai","Rafael","Israel","Tate","Lukas","Nico","Marcus","Stetson","Javier","Colt","Omar","Simon","Kash","Remington","Jeremy","Louis","Mark","Lennox","Callum","Kairo","Nash","Kyler","Dallas","Crew","Preston","Paxton","Steven","Zane","Kaleb","Lane","Phoenix","Paul","Cash","Kenneth","Bryce","Ronan","Kaden","Maximiliano","Walter","Maximus","Emerson","Hendrix","Jax","Atticus","Zayn","Tobias","Cohen","Aziel","Kayson","Rory","Brady","Finley","Holden","Jorge","Malcolm","Clayton","Niko","Francisco","Josue","Brian","Bryan","Cade","Colin","Andre","Cayden","Aidan","Muhammad","Derek","Ali","Elian","Bodhi","Cody","Jensen","Damien","Martin","Cairo","Ellis","Khalil","Otto","Zander","Dante","Ismael","Angelo","Brantley","Manuel","Colson","Cruz","Tatum","Jaylen","Jaden","Erick","Cristian","Romeo","Milan","Reid","Cyrus","Leonel","Joaquin","Ari","Odin","Orion","Ezequiel","Gideon","Daxton","Warren","Casey","Anderson","Spencer","Karson","Eduardo","Chance","Fernando","Raymond","Bradley","Cesar","Wade","Prince","Julius","Dakota","Kade","Koa","Raiden","Callan","Hector","Onyx","Remy","Ricardo","Edwin","Stephen","Kane","Saint","Titus","Desmond","Killian","Sullivan","Mario","Jay","Kamari","Luciano","Royal","Zyaire","Marco","Wilder","Russell","Nasir","Rylan","Archie","Jared","Gianni","Kashton","Kobe","Sergio","Travis","Marshall","Iker","Briggs","Gunner","Apollo","Bowen","Baylor","Sage","Tyson","Kyle","Oakley","Malik","Mathias","Sean","Armani","Hugo","Johnny","Sterling","Forrest","Harvey","Banks","Grady","Kameron","Jake","Franklin","Lawson","Tanner","Eden","Jaziel","Pablo","Reed","Pedro","Zayne","Royce","Edgar","Ibrahim","Winston","Ronin","Leonidas","Devin","Damon","Noel","Rhys","Clark","Corbin","Sonny","Colter","Esteban","Erik","Baker","Adan","Dariel","Kylo","Tripp","Caiden","Frank","Solomon","Major","Memphis","Quinn","Dax","Hank","Donovan","Finnegan","Nehemiah","Andy","Camilo","Asa","Jeffrey","Santino","Isaias","Jaiden","Kian","Fabian","Callen","Ruben","Alexis","Emanuel","Francis","Garrett","Kendrick","Matthias","Wells","Augustus","Jasiah","Alijah","Alonzo","Koda","Collin","Ford","Frederick","Jaxton","Kohen","Troy","Kason","Seth","Denver","Kyson","Ares","Raphael","Bodie","Sylas","Uriel","Zaiden","Shiloh","Lewis","Kieran","Marcos","Bo","Shepherd","Philip","Zaire","Gregory","Princeton","Roberto","Leland","Eithan","Moshe","Johnathan","Lucca","Kenzo","Mack","Porter","Kolton","Kaison","Valentino","Saul","Shane","Jamari","Rocco","Kylan","Deacon","Dalton","Moses","Callahan","Tadeo","Makai","Amiri","Rowen","Drew","Jalen","Kylian","Sutton","Dominick","Reece","Rodrigo","Soren","Kasen","Ridge","Zachariah","Jamir","Peyton","Omari","Trevor","Morgan","Izaiah","Alessandro","Kaysen","Enrique","Marcelo","Sincere","Lucian","Leandro","Armando","Braylen","Jayson","Julio","Lawrence","Cassius","Raul","Jase","Mohammad","Zain","Jayceon","Jonas","Ronald","Ayaan","Rio","Allen","Bruce","Mohamed","Dorian","Maximilian","Keegan","Shawn","Yusuf","Pierce","Ariel","Ander","Conor","Conrad","Phillip","Arjun","Roy","Moises","Arturo","Johan","Gerardo","Atreus","Nikolai","Braylon","Samson","Hezekiah","Kayce","Scott","Gunnar","Jamison","Samir","Keanu","Ledger","Jaime","Finnley","Cannon","Colby","Nikolas","Emmitt","Kamden","Miller","Boone","Hamza","Ocean","Mac","Anakin","Brixton","Roland","Huxley","Zeke","Danny","Marvin","Otis","Albert","Clay","Emir","Boston","Bruno","Lionel","Ozzy","Taylor","Jamie","Augustine","Chaim","Krew","Rayan","Alden","Bellamy","Amos","Drake","Davis","Dustin","Corey","Ahmad","Conner","Gustavo","Layton","Abram","Axton","Chandler","Azariah","Reese","Benson","Tru","Case","Trey","Mauricio","Westin","Gage","Reign","Creed","Mylo","Dennis","Quentin","Madden","Rome","Julien","Sam","Zaid","Marcel","Maximo","Layne","Ahmed","Kannon","Quincy","Yosef","Aarav","Lennon","Ryland","Skyler","Chris","Eliam","Kareem","Kyree","Dario","Donald","Fletcher","Darius","Duke","Rayden","Salem","Vicente","Vincenzo","Cayson","Eliseo","Issac","Lian","Clyde","Wilson","Santana","Tomas","Dexter","Keith","Houston","Harry","Uriah","Lee","Rex","Tony","Carmelo","Alberto","Loyal","Trace","Alfredo","Riggs","Forest","Raylan","Salvador","Jakari","Zakai","Louie","Flynn","Leonard","Mohammed","Derrick","Musa","Avi","Ty","Westley","Ambrose","Brycen","Aron","Caspian","Gatlin","Harlan","Dillon","Emery","Nixon","Tommy","Watson","Zayd","Azrael","Zyair","Azriel","Legacy","Cillian","Alvin","Bridger","Alec","Edison","Kingsley","Remi","Briar","Jaxxon","Truett","Lachlan","Cal","Landen","Roger","Alonso","Kaiser","Blaze","Jerry","Seven","Kenji","Noe","Quinton","Grey","Jefferson","Marcellus","Ray","Kyro","Benicio","Justice","Neil","Idris","Bear","Kiaan","Wayne","Ben","Junior","Karim","Yehuda","Jimmy","Ramon","Bjorn","Nathanael","Stanley","Hassan","Magnus","Trenton","Brayan","Brock","Jagger","Cason","Dakari","Rey","Abdiel","Abdullah","Casen","Jiraiya","Lance","Misael","Alvaro","Robin","Langston","Nelson","Wes","Khari","Landyn","Jakai","Lochlan","Valentin","Keaton","Amias","Joziah","Thaddeus","Jedidiah","Orlando","Eliel","Hugh","Koen","Calum","Enoch","Mitchell","Rohan","Aryan","Dilan","Aden","Allan","Leighton","Elisha","Evander","Castiel","Curtis","Kellen","Dash","Douglas","Eddie","Melvin","Avyaan","Everest","Zamir","Ricky","Dutton","Yahir","Devon","Franco","Khaza","Dior","Leif","Sevyn","Guillermo","Ira","Emory","Felipe","Titan","Alfred","Azael","Zahir","Kellan","Darren","Rudy","Ayan","Leroy","Anders","Ishaan","Reuben","Boden","Mccoy","Heath","Kase","Wylder","Judson","Khai","Kye","Axl","Crue","Ernesto","Ahmir","Zyon","Aries","Mustafa","Santos","Dane","Damari","Elio","Jadiel","Jovanni","Salvatore","Mathew","Kolson","Nova","Brendan","Murphy","Brodie","Damir","Rocky","Larry","Fisher","Waylen","Byron","Ermias","Joey","Joe","Jon","Arian","Chosen","Jairo","Vihaan","Kylen","Ameer","Dion","Jrue","Kaizen","Yousef","Bryant","Cullen","Kaisen","Kelvin","Zen","Kartier","Randy","Shepard","Alaric","Cain","Jeremias","Alfonso","Brecken","Colten","Gian","Rhodes","Wesson","Duncan","Harold","Henrik","Harley","Alistair","Agustin","Jericho","Talon","Westyn","Cassian","Eugene","Ryatt","Shmuel","Braden","Yahya","Aldo","Dangelo","Ezrah","Korbin","Zavier","Bronson","Teo","Jones","Neo","Stefan","Van","Mekhi","Coleson","Eren","Ignacio","Kristian","Harlem","Zev","Canaan","Cedric","Khalid","Bode","Gary","Rene","Benedict","Maxton","Thatcher","Wallace","Davian","Gordon","Niklaus","Yisroel","Kabir","Osman","Adler","Darian","Terry","Cartier","Osiris","Vance","Demetrius","Kamryn","Lux","Stone","Jaxx","Kooper","Rodney","Aurelio","Darwin","Jakob","Zechariah","Brennan","Marlon","Meir","Yael","Asaiah","Atharv","Imran","Ivaan","Kanan","Kalel","London"];
  // prettier-ignore
  let female = ["Olivia","Emma","Charlotte","Amelia","Sophia","Isabella","Ava","Mia","Evelyn","Luna","Harper","Camila","Sofia","Scarlett","Elizabeth","Eleanor","Emily","Chloe","Mila","Violet","Penelope","Gianna","Aria","Abigail","Ella","Avery","Hazel","Nora","Layla","Lily","Aurora","Nova","Ellie","Madison","Grace","Isla","Willow","Zoe","Riley","Stella","Eliana","Ivy","Victoria","Emilia","Zoey","Naomi","Hannah","Lucy","Elena","Lillian","Maya","Leah","Paisley","Addison","Natalie","Valentina","Everly","Delilah","Leilani","Madelyn","Kinsley","Ruby","Sophie","Alice","Genesis","Claire","Audrey","Sadie","Aaliyah","Josephine","Autumn","Brooklyn","Quinn","Kennedy","Cora","Savannah","Caroline","Athena","Natalia","Hailey","Aubrey","Emery","Anna","Iris","Bella","Eloise","Skylar","Jade","Gabriella","Ariana","Maria","Adeline","Lydia","Sarah","Nevaeh","Serenity","Liliana","Ayla","Everleigh","Raelynn","Allison","Madeline","Vivian","Maeve","Lyla","Samantha","Rylee","Eva","Melody","Clara","Hadley","Julia","Piper","Juniper","Parker","Brielle","Eden","Remi","Josie","Rose","Arya","Eliza","Charlie","Peyton","Daisy","Lucia","Millie","Margaret","Freya","Melanie","Elliana","Adalynn","Alina","Emersyn","Sienna","Mary","Isabelle","Alaia","Esther","Sloane","Mackenzie","Amara","Ximena","Sage","Cecilia","Valeria","Reagan","Valerie","Catalina","River","Magnolia","Kehlani","Summer","Ashley","Andrea","Isabel","Oakley","Olive","Oaklynn","Ember","Kaylee","Georgia","Juliette","Anastasia","Genevieve","Katherine","Blakely","Reese","Amaya","Emerson","Brianna","June","Alani","Lainey","Arianna","Rosalie","Sara","Jasmine","Ruth","Adalyn","Ada","Bailey","Ariella","Wren","Myla","Khloe","Callie","Elsie","Alexandra","Ryleigh","Faith","Norah","Margot","Zuri","Journee","Aspen","Gemma","Kylie","Molly","Blake","Zara","Alaina","Alana","Brynlee","Amy","Annie","Saylor","Ana","Amira","Kimberly","Noelle","Kamila","Morgan","Phoebe","Harmony","Sutton","Taylor","Finley","Lilah","Juliana","Lila","Londyn","Kailani","Vera","Kaia","Angela","Hallie","Diana","Lennon","Presley","Arabella","Aliyah","Lilly","Milani","Jordyn","Camille","Ariel","Aubree","Selena","Sawyer","Nyla","Delaney","Mariana","Rachel","Adaline","Leila","Collins","Lia","Octavia","Kali","Lena","Kiara","Kaylani","Elaina","Daniela","Leia","Gracie","Dakota","Elise","Hope","Harlow","Lola","Stevie","Malia","Miriam","Alora","Gia","Evangeline","Brooke","Lilith","Sydney","Ophelia","Alayna","Tatum","Evie","Rowan","Marley","Daphne","Kayla","Dahlia","Lucille","Blair","Adelaide","Wrenley","Haven","Teagan","Adelyn","Alyssa","Payton","Jane","Mckenna","Celeste","Juliet","Palmer","Maggie","Rebecca","London","Noa","Samara","Thea","Kendall","Mya","Talia","Winter","Angelina","Vivienne","Esme","Laila","Nina","Trinity","Vanessa","Mabel","Camilla","Jocelyn","Journey","Paige","Phoenix","Amina","Alivia","Amari","Joanna","Nicole","Annabelle","Raegan","Aitana","Julianna","Lauren","Catherine","Adriana","Madilyn","Harley","Tessa","Evelynn","Elianna","Rory","Dream","Nayeli","Poppy","Gabriela","Jayla","Cataleya","Celine","Hayden","Shiloh","Mariah","Charlee","Maisie","Regina","Adelynn","Briella","Giselle","Fatima","Danna","Alessia","Mckenzie","Wynter","Fiona","Brooklynn","Gracelynn","Luciana","Alexis","Everlee","Laura","Selah","Reign","Alayah","Rosemary","Lilliana","Ariyah","Heidi","Esmeralda","Logan","Amora","Kalani","Leighton","Cali","Melissa","Aniyah","Izabella","Michelle","Raelyn","Alessandra","Viviana","Madeleine","Arielle","Serena","Francesca","Brynn","Gwendolyn","Kira","Destiny","Elle","Makayla","Alaya","Malani","Willa","Saige","Makenna","Remington","Demi","Adelina","Raya","Astrid","Azalea","Veronica","Meadow","Anaya","Elisa","Raven","Alexandria","Hattie","Alicia","Sabrina","Gracelyn","Matilda","Skye","Annalise","Frances","Miracle","Maia","Helen","Lana","Daleyza","Rosie","Charli","Bianca","Royalty","Sarai","Amiyah","Nylah","Aylin","Maryam","Scarlet","Antonella","Sylvia","Sylvie","Nadia","Ari","Lexi","Mylah","Julieta","Lorelei","Avianna","Armani","Camryn","Emely","Rylie","Colette","Daniella","Liana","Brinley","Kate","Salem","Marlee","Alison","Carmen","Felicity","Fernanda","Holly","Ariah","Aisha","Kora","Amanda","Ailani","Elaine","Emory","Joy","Oaklee","Lyric","Madelynn","Haisley","Allie","Helena","Danielle","Katalina","Carolina","Zariah","Navy","Cassidy","Lorelai","Stephanie","Alma","Mira","Legacy","Jolene","Anya","Dorothy","Paris","Yaretzi","Aurelia","Maddison","Renata","Jimena","Xiomara","Itzel","Heaven","Lyra","Estella","Gabrielle","Maren","Jacqueline","Jennifer","Imani","Jordan","Paislee","Ainsley","Emmy","Jessica","Alondra","Mae","Makenzie","Bristol","Edith","Cameron","Elora","Jazlyn","Averie","Ivory","Kenzie","Emelia","Angel","Cecelia","Maliyah","Oakleigh","Opal","Oaklyn","Kinley","Kayleigh","Bonnie","April","Kamryn","Mallory","Briar","Leona","Keira","Alexa","Macie","Ariya","Briana","Virginia","Skyler","Amber","Hanna","Monroe","Frankie","Miranda","Dayana","Charleigh","Meredith","Carter","Sierra","Sunny","Indie","Eve","Beatrice","Nalani","Kyla","Clementine","Katie","Kennedi","Myra","Blaire","Davina","Faye","Anahi","Madilynn","Alejandra","Alanna","Ivanna","Mariam","Yara","Anne","Addilyn","Braelynn","Lilian","Dylan","Amirah","Lina","Reyna","Amalia","Amani","Ryan","Calliope","Isabela","Michaela","Abby","Alia","Emerie","Lylah","Holland","Sevyn","Winnie","Leyla","Shelby","Rosalia","Zariyah","Rhea","Emberly","Marie","Nia","Remy","Chaya","Haley","Kaliyah","Rosa","Zahra","Jayleen","Karsyn","Malaysia","Jaliyah","Mina","Kensley","Lennox","Maxine","Hadassah","Mikayla","Margo","Noah","Azariah","Mara","Eileen","Florence","Melany","Reina","Journi","Amaia","Kaitlyn","Elliott","Kelsey","Nola","Gloria","Keilani","Freyja","Arleth","Jenna","Sloan","Analia","Louise","Melina","Sasha","Dior","Thalia","Noemi","Maci","Dallas","Marina","Aliana","Ezra","Adley","Cassandra","Aleena","Leslie","Capri","Mckinley","Angelica","Romina","Della","Kathryn","Kyra","Milan","Tiana","Khaleesi","Nellie","Cleo","Murphy","Bethany","Irene","Ellianna","Zelda","Aleah","Janelle","Yareli","Adalee","Dani","Marceline","Coraline","Estrella","Ila","Iyla","Mavis","Kenna","Vienna","Zendaya","Cheyenne","Erin","Karla","Mikaela","Jazmin","Persephone","Elodie","Selene","Chelsea","Scout","Theodora","Lara","Marilyn","Novah","Ellis","Charley","Jemma","Amayah","Karina","Kendra","Miley","Laney","Laurel","Leilany","Halle","Jenesis","Malaya","Marleigh","Wrenlee","Zaylee","Fallon","Julie","Priscilla","Bellamy","Adrianna","Angie","Siena","Aileen","Macy","Estelle","Hana","Martha","Flora","Kylee","Liv","Megan","Sariyah","Galilea","Penny","Jovie","Jamie","Amoura","Emmie","Henley","Sky","Christina","Violeta","Arlet","Belen","Aviana","Kori","Monica","Savanna","Naya","Alena","Aya","Waverly","Brynleigh","Aliza","Kiana","Love","Clover","Pearl","Skyla","Bria","Ocean","Alisson","Treasure","Lillie","Jaylani","Liberty","Rayna","Milana","Zaria","Emerald","Halo","Taytum","Andi","Milena","Noor","Kataleya","Kimber","Carly","Jream","Samira","Ashlyn","Hunter","Marlowe","Promise","Joelle","Dulce","Lea","Ashlynn","Zoya","Elliot","Jolie","Kai","Bridget","Johanna","Paulina","Ramona","Aila","Jessie","Mercy","Rayne","Rivka","Arlette","Paula","Valery","Birdie","Nala","Kelly","Kinslee","Linda","Madisyn","Aspyn","Baylor","Chana","Zaniyah","Goldie","Marianna","Novalee","Loretta","Elyse","Stormi","Adele","Berkley","Anika","Marisol","Kassidy","Roselyn","Louisa","Alexia","Dalia","Ensley","Hayley","Jayda","Harmoni","Jada","Marigold","Zayla","Ayleen","Natasha","Sol","Annika","Malayah","Drew","Anais","Angelique","Zhuri","Aliya","Azaria","Zora","Allyson","Brittany","Kamiyah","Gwen","Vada","Giuliana","Elina","Hadlee","Itzayana","Jianna","Cadence","Greta","Lilianna","Denver","Robin","August","Jazmine","Royal","Braelyn","Celia","Yamileth","Avayah","Baylee","Iliana","Teresa","Amelie","Judith","Kara","Lacey","Amiri","Elowyn","Georgina","Justice","Emmalyn","Harlee","Kamari","Kaydence","Khalani","Luisa","Whitley","Bailee","Cynthia","Karter","Livia","Aubrie","Veda","Janiyah","Salma","Araya","Aubrielle","Bexley","Giana","Keyla","Katelyn","Saoirse","Sariah","Araceli","Artemis","Averi","Yasmin","Kaiya","Emberlynn","Amaris","Sapphire","Kallie","Shay","Guinevere","Lilyana","Magdalena","Tinsley","Zainab","Deborah","Kenia","Laylah","Layne","Scottie","Carla","Chandler","Rosalina","Kairi","Lauryn","Nyomi","Raina","Aubriella","Elia","Lenora","Lisa","Nori","Tiffany","Giovanna","Jaylah","Rosalyn","Chanel","Maddie","Avah","Leanna","Luz","Addilynn","Brylee","Casey","Laylani","Tru","Billie","Lottie","Alianna","Meilani","Lexie","Nathalia","Avalynn","Julissa","Paloma","Rosalee","Rebekah","Simone","Egypt","Scarlette","Sarahi","Alaiya","Hadleigh","Inaya","Keily","Lakelynn","Nyra","Princess","Rowyn","Vida","Elisabeth","India","Ryann","Barbara","Belle","Saanvi","Xyla","Winona","Aadhya","Indigo","Lakelyn","Paola","Emmeline","Joyce","Kamilah","Maisy","Rylan","Soleil","Ainhoa","Maleah","Neriah","Elsa","Emiliana","Luella","Nancy","Cielo","Madalyn","Kahlani"];

  for (let kind of ['male', 'female']) {
    document.getElementById(kind).addEventListener(
      'click',
      () => {
        let names = kind === 'male' ? male : female;
        loadCards(Object.fromEntries(names.map(n => [n, 0])));
      },
      { signal: listenerController.signal }
    );
  }

  document.getElementById('custom').addEventListener(
    'click',
    () => {
      let input = document.createElement('input');
      input.type = 'file';
      input.addEventListener('change', async event => {
        let text = await readFile(event.target.files[0]);
        loadCustomNames(text);
      });
      input.click();
    },
    { signal: listenerController.signal }
  );

  function loadCustomNames(text) {
    let names = text
      .split('\n')
      .map(x => x.trim())
      .filter(x => x.length > 0);
    names = [...new Set(names)];
    if (names.length < 2) return;
    loadCards(Object.fromEntries(names.map(n => [n, 0])));
  }

  allowDragDrop(loadCustomNames);
}

function allowDragDrop(handler) {
  document.body.addEventListener(
    'dragover',
    event => {
      event.preventDefault();
      overlay.style.display = 'block';
    },
    { signal: listenerController.signal }
  );
  document.body.addEventListener(
    'dragleave',
    event => {
      event.preventDefault();
      overlay.style.display = 'none';
    },
    { signal: listenerController.signal }
  );
  document.body.addEventListener(
    'drop',
    async event => {
      event.preventDefault();
      overlay.style.display = 'none';

      let text = await readFile(event.dataTransfer.files[0]);
      handler(text);
    },
    { signal: listenerController.signal }
  );
}

// --- main app

function loadCards(scores) {
  clearState();
  document.getElementById('cardContainer').style.display = 'initial';

  let names = Object.entries(scores)
    .filter(([k, v]) => v === 0)
    .map(([k, v]) => k);
  if (names.length === 0) {
    loadResults(scores);
    return;
  }

  let currentIndex = 0;

  let currentCard = document.getElementById('currentCard');
  let nextCard = document.getElementById('nextCard');

  currentCard.textContent = names[currentIndex];
  nextCard.textContent = names[currentIndex + 1];

  document.getElementById('resultsButton').addEventListener(
    'click',
    () => {
      loadResults(scores);
    },
    { signal: listenerController.signal }
  );

  let timeout = -1;
  document.addEventListener(
    'keydown',
    event => {
      if (!['ArrowRight', 'ArrowLeft'].includes(event.key)) {
        return;
      }

      if (timeout !== -1) {
        clearTimeout(timeout);
        updateCards();
        currentCard.offsetHeight; // trigger reflow
      }
      if (currentIndex >= names.length) {
        return;
      }
      let accept = event.key === 'ArrowRight';
      let name = names[currentIndex];
      scores[name] = accept ? 1 : -1;
      localStorage.setItem(storageKey, JSON.stringify(scores));
      currentIndex++;

      currentCard.classList.add(accept ? 'slide-right' : 'slide-left');
      nextCard.classList.add('shadow');
      if (currentIndex < names.length) {
        nextCard.classList.remove('hide');
      }
      timeout = setTimeout(updateCards, 500);
    },
    { signal: listenerController.signal }
  );

  function updateCards() {
    timeout = -1;
    if (currentIndex >= names.length) {
      loadResults(scores);
      return;
    }
    currentCard.textContent = names[currentIndex];
    nextCard.textContent = names[currentIndex + 1] ?? names[0];
    nextCard.classList.add('hide');
    currentCard.classList.remove('slide-left', 'slide-right');
  }
}

// --- scores

function loadResults(scores) {
  clearState();
  document.getElementById('results').style.display = 'initial';

  let names = Object.keys(scores);
  let doneCount = Object.values(scores).filter(v => v !== 0).length;
  document.getElementById('count').innerHTML = `You've rated ${doneCount}/${names.length} names.`;

  let scoreLists = [scores];

  let continueButton = document.getElementById('continueButton');
  if (doneCount < names.length) {
    continueButton.style.display = 'initial';
    continueButton.addEventListener(
      'click',
      () => {
        loadCards(scores);
      },
      { signal: listenerController.signal }
    );
  } else {
    continueButton.style.display = 'none';
  }

  document.getElementById('download').addEventListener(
    'click',
    () => {
      save(scores);
    },
    { signal: listenerController.signal }
  );

  function addScore(text) {
    try {
      scoreLists.push(parseScores(text));
      renderScoreLists(scoreLists);
      console.log(scoreLists);
    } catch (e) {
      console.error(e);
      alert("Couldn't read file");
    }
  }
  allowDragDrop(addScore);

  document.getElementById('upload').addEventListener(
    'click',
    () => {
      let input = document.createElement('input');
      input.type = 'file';
      input.addEventListener('change', async event => {
        let text = await readFile(event.target.files[0]);
        addScore(text);
      });
      input.click();
    },
    { signal: listenerController.signal }
  );

  let dismiss = modal => e => {
    let dims = modal.getBoundingClientRect();
    if (e.clientX < dims.left || e.clientX > dims.right || e.clientY < dims.top || e.clientY > dims.bottom) {
      modal.close();
    }
  };

  let confirmReset = document.querySelector('.confirm-reset-modal');
  confirmReset.addEventListener(
    'click',
    e => {
      let dims = confirmReset.getBoundingClientRect();
      if (e.clientX < dims.left || e.clientX > dims.right || e.clientY < dims.top || e.clientY > dims.bottom) {
        confirmReset.close();
      }
    },
    { signal: listenerController.signal }
  );
  document.getElementById('confirmCancel').addEventListener(
    'click',
    () => {
      confirmReset.close();
    },
    { signal: listenerController.signal }
  );
  document.getElementById('confirmReset').addEventListener(
    'click',
    () => {
      confirmReset.close();
      localStorage.removeItem(storageKey);
      loadIntro();
    },
    { signal: listenerController.signal }
  );

  document.getElementById('reset').addEventListener(
    'click',
    () => {
      confirmReset.showModal();
    },
    { signal: listenerController.signal }
  );

  let nameResults = document.getElementById('nameResults');

  function renderScoreLists(scoreLists) {
    nameResults.innerHTML = '';
    for (let { name, tag } of getScoresFor(scoreLists)) {
      let tr = document.createElement('tr');
      let td1 = document.createElement('td');
      td1.innerText = name;
      let td2 = document.createElement('td');
      td2.innerHTML = tag;
      tr.append(td1, td2);
      nameResults.append(tr);
    }
  }

  renderScoreLists(scoreLists);
}

function save(scores) {
  let fname = 'name_scores.json';
  let file = new File([JSON.stringify(scores)], fname);
  let url = URL.createObjectURL(file);

  try {
    let link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fname);
    link.click();
  } finally {
    URL.revokeObjectURL(url);
  }
}

function getScoresFor(scoreLists) {
  let allNames = new Set();
  for (let obj of scoreLists) {
    for (let name of Object.keys(obj)) {
      allNames.add(name);
    }
  }
  let out = [];
  for (let name of allNames) {
    let yes = 0;
    let no = 0;
    let tag = '';
    for (let obj of scoreLists) {
      if (!Object.hasOwn(obj, name) || obj[name] === 0) {
        tag += '<span class="tag-item">?</span>';
      } else if (obj[name] === 1) {
        ++yes;
        tag += '<span class="tag-item green">\u2713</span>';
      } else {
        if (obj[name] !== -1) {
          console.error('corrupt score', obj[name]);
        }
        ++no;
        tag += '<span class="tag-item red">\u00D7</span>';
      }
    }
    out.push({ name, yes, no, tag });
  }
  out.sort((a, b) => (a.no === b.no ? b.yes - a.yes : a.no - b.no));
  return out;
}
