const Move = (id1, id2) => {
  $("#"+id1).hide()
  $("#"+id2).show()
}

const Shuffle = arr => {
  let res = Array.from(arr)
  for (let i = 1; i < res.length; i++) {
    let r = Math.floor(Math.random()*(i+1))
    let tmp = res[i]
    res[i] = res[r]
    res[r] = tmp
  }
  return res
}

class Quiz {
  constructor(a, q, img) {
    this.q = q
    this.a = a
    this.img = img

    this.init()
  }

  step() {
    this.t++
    if (this.t > this.c) {
      this.t = 0
      this.c++
      return true
    }
    return false
  }

  init() {
    this.c = 0
    this.t = 0
  }
}

const quizList = [

  // 国旗 → 国名
  [
    // アジア
    [
      // 中央アジア
      [
        new Quiz("カザフスタン共和国", "青地は空、中央の金色は32本の光を擁する太陽と翼を広げて飛ぶ鷲を示す。左端の伝統的な文様は鷲の翼と雄羊をモチーフにしたものである。", "img/KZL.gif"),
        new Quiz("ウズベキスタン共和国", "青は青天と純水、白は平和と純粋、緑は自然、赤い線は生命力を表している。", "img/UZL.gif"),
        new Quiz("キルギス共和国", "国民からデザインを募集して作られた。パオ（テントのような住居）の中から天井の中心を見上げたときに見える太陽が描かれている。", "img/KGL.gif"),
        new Quiz("タジキスタン共和国", "赤は国家統合、白はこの国で産出される綿と国民統合、緑は国土の自然を表している。中央の紋章は７つの星に囲まれた王冠で、独立、友情、友好を表している。", "img/TJL.gif"),
        new Quiz("トルクメニスタン", "緑色に三日月と星はイスラム教の国であることを示し、左側の装飾文様は５つの主要な部族を、星はこの国の５つの地方を表している。", "img/TML.gif")
      ],

      // 東アジア
      [
        new Quiz("中華人民共和国", "「五星紅旗（ごせいこうき）」ともいわれ、赤は共産主義のシンボルの色。大きな星は共産党を、小さな４つの星は労働者、農民、知識階級、愛国的資本家を表している。", "img/CNL.gif"),
        new Quiz("モンゴル国", "赤は正義を、青は空を表す。左側に画かれているのはソヨンボ。ソヨンボはこの国の古くからのシンボルで、国民の自由や独立を象徴している。", "img/MNL.gif"),
        new Quiz("日本国", "一般的には「日の丸」、法律上では「日章旗」と呼ばれていて、丸は太陽を表す。", "img/JPL.gif"),
        new Quiz("朝鮮民主主義人民共和国", "青と赤は伝統的な民族の色として親しまれているもの。また、赤は社会主義のシンボルの色であり、青は平和への希望を、星は社会主義国家の建設を表している。", "img/KPL.gif"),
        new Quiz("大韓民国", "中央の円は太極といって宇宙を表している（このことにより太極旗ともいわれる）。青は陰を、赤は陽を示し、善と悪、男と女、太陽と月、積極と消極等、万物は陰陽によって調和統一するとされる。四隅にあるのは易の卦（け）で、乾（乾・けん）、坤（坤・こん）、坎（坎・かん）、離（離・り）と読み、天地火水、父母男女、東西南北等、すべてが対比によって和合していることを示す。", "img/KRL.gif")
      ],

      // 南アジア
      [
        new Quiz("アフガニスタン・イスラム国", "黒は過去、赤は独立のために流された血、緑は未来への希望を表す。中央の紋章には「アッラーのほかに神はなく、ムハンマドはアッラーの使徒」というシャハーダ（信仰告白）やモスクなどが描かれ、それを麦の穂と剣で囲んでいる。", "img/AFL.gif"),
        new Quiz("バングラデシュ人民共和国", "緑がイスラム教と農業の発展を、赤い丸は独立に流された血と太陽の恵みを表している。丸は風になびいても中央に見えるように少し旗竿側に寄せてある。", "img/BDL.gif"),
        new Quiz("ブータン王国", "黄色は現世での国王の権威を示し、オレンジ色は宗教の営みと仏教の力を象徴している。龍は国名（雷龍の国）と国の清らかさを、爪に握られている宝石は国の豊かさと完全性を意味している。", "img/BTL.gif"),
        new Quiz("インド", "オレンジ（サフラン色）はヒンズー教を、緑はイスラム教を、白は平和を表している。中央の紋章はチャクラといい、３世紀頃のインドの神殿の柱にある飾り物。24の車軸は１日の時間を表している。", "img/INL.gif"),
        new Quiz("モルディブ共和国", "緑と白い三日月は伝統的なイスラム教の色。赤はイスラムのために流された血を、緑は平和と繁栄を表している。", "img/MVL.gif"),
        new Quiz("ネパール連邦民主共和国", "三角を２つ重ねた世界でも珍しい国旗。図柄の月と太陽はヒンズー教のシンボルで、月は王室、太陽は宰相一家をも表している。", "img/NPL.gif"),
        new Quiz("パキスタン・イスラム共和国", "緑はイスラムの聖なる色で国の繁栄を、白は平和を表している。また、三日月は進歩と発展を、星は光明と知識を、左側の白い部分はこの国の東部を表している。", "img/PKL.gif"),
        new Quiz("スリランカ民主社会主義共和国", "緑はイスラム教を、オレンジ（サフラン色）はヒンズー教を表している。剣を持つライオンは、この国のシンハラ王朝以来のシンボル。四隅の葉は菩提樹で、この国の70％をしめる仏教徒を表している。", "img/LKL.gif")
      ],

      // 東南アジア
      [
        new Quiz("ブルネイ・ダルサラーム国", "黄色はマレー人にとって幸福の色とされている。国民のほとんどがイスラム教のため、中央にはイスラムのシンボルが画かれている。", "img/BNL.gif"),
        new Quiz("カンボジア王国", "中央の建物はアンコールワット。政変により何度かデザインが変わったが、 民族の誇りであるアンコールワットは常に描かれている。", "img/KHL.gif"),
        new Quiz("インドネシア共和国", "古くは、赤が太陽、白が月を表すといわれていた。今では、赤が自由と勇気、白が正義と純潔を示している。1950年制定。※モナコの国旗と同じデザイン。", "img/IDL.gif"),
        new Quiz("ラオス人民民主共和国", "赤は革命で流された血を、青は国の繁栄を、白は未来への展望と約束を表している。", "img/LAL.gif"),
        new Quiz("マレーシア", "14本の赤と白の線は独立したときの州の数を、青はイギリス連邦の一員であることを、三日月と星はイスラム教の国であることを表している。", "img/MYL.gif"),
        new Quiz("ミャンマー連邦共和国", "黄色は国民の団結、緑は平和と豊かな自然、赤は勇気と決断力を表している。また、地理的、民族的に一体化する意義を込め、中心に（三色の帯にまたがるように）白い星を配置している。", "img/MML2.gif"),
        new Quiz("フィリピン共和国", "白は平和を、青は高い政治目的を、赤は勇気を表している。８つの光を放つ太陽は、独立運動に最初に立ち上がった州を、３つの星はルソン島、ミンダナオ島、ビサヤ島を表している。また、戦争が始まると国旗の天地を逆にし、赤を上にして国民の勇気を奮い立たせるという。", "img/PHL.gif"),
        new Quiz("シンガポール共和国", "赤はすべての国民と人類の平等を、白は純粋性を、５つの星は自由、平和、進歩、平等、公正を、三日月は５つの星が理想に向かって進むことを、つまり国の発展を表している。", "img/SGL.gif"),
        new Quiz("タイ王国", "この国旗になる前は赤地にこの国のシンボルである白い象が画かれていたが、1910年に起こった国旗逆掲揚事件（国王のラーマ６世が洪水で被害を受けた地域を視察していた際、国旗が逆さまに掲揚されていた）をきっかけに、1917年、上下左右相称のトライロンガとよばれる３色旗が制定された。白は白象の代わりで、赤は国民、青はチャクリ王朝を表している。ちなみに、象を描くのが難しいので簡単にしたという説もある。", "img/THL.gif"),
        new Quiz("東ティモール", "独立運動に使用した旗をそのまま国旗に制定。黒は植民地であった暗黒の時代を、黄は独立に向けての戦いを、赤は独立戦争で流れた血を、星は希望を表している。", "img/EML.gif"),
        new Quiz("ベトナム社会主義共和国", "「金星紅旗（きんせいこうき）」と呼ばれている。赤は社会主義国に共通の色で、革命に流した戦士の血を、黄色の星は労働者、農民、知識人、青年の団結を表している。", "img/VNL.gif")
      ],

      // 南アジア
      [
        new Quiz("サウジアラビア王国", "緑はイスラム教の聖なる色。アラビア文字で「アッラーのほかに神は存在しない。マホメット（ムハンマド）はアッラーの預言者である」とコーランの冒頭の聖句が書かれている。剣は聖地メッカを守護する意味がある。モルドバやパラグアイの国旗と同じように表と裏でデザインが違う（文字の向きは同じ、剣の向きが逆）。", "img/SAL.gif"),
        new Quiz("イラク共和国", "赤は勇気を、白は寛大さを、黒はイスラムの伝統を表す。コーランの「アラーは偉大なり」の文字を入れている。赤、白、黒、緑はアラブ・イスラム教国の特有の色。", "img/IQL.gif"),
        new Quiz("アラブ首長国連邦", "17世紀のイラクの詩人の詩に基づき作られた。緑は豊かな国土を、白は清浄な生活を、黒は過酷な戦争を、そして赤は血なまぐさい過去の歴史を表わしている。", "img/AEL.gif"),
        new Quiz("カタール国", "もともとは赤色だったが、染色が悪く、強い日差しのためチョコレート色に変ってしまった。今ではその色が国旗の色として制定。正式な国旗の縦横比は11対28で、世界一細長い国旗。バーレーンと同じくギザギザを直線にすることもある。", "img/QAL.gif"),
        new Quiz("バーレーン王国", "赤は伝統的にアラビア湾岸の国々の国旗に使われる色で、白いギザギザの５つの頂点は、イスラム教の五行を表す。カタールと同じくギザギザを直線にすることもある。", "img/BHL.gif"),
        new Quiz("クウェート国", "緑は平和、白は清廉、赤は血（勝利）、黒は戦いを象徴している。これらの色は、サフィーエ　アル・ディーン　アル・ヒリーの詩に由来している。", "img/KWL.gif"),
        new Quiz("オマーン国", "赤は国防を、白は平和を、緑は農作物を表している。左上の紋章は、伝統的な剣を交差させたものにナイフを重ねたこの国のシンボル。", "img/OML.gif"),
        new Quiz("イエメン共和国", "赤白黒の横３色旗は、アラブ連合の旗に由来し、アラブの統一を象徴している。赤は独立のための革命を、白は平和と希望を、黒は植民地時代を表す。", "img/YEL.gif"),
        new Quiz("イラン・イスラム共和国", "緑はイスラム教シーア派の色、白は平和と友情、赤は共和国憲法発布の色とされる。", "img/IRL.gif"),
        new Quiz("レバノン共和国", "赤は勇気と犠牲を、白は石灰質の多い国土と平和と純潔を表している。中央はこの国の名前の付いた杉で、キリスト教徒のシンボル。 この木でソロモンは神殿をつくり、フェニキア人は船をつくり、カルタゴに海洋植民地を築いた。", "img/LBL.gif"),
        new Quiz("シリア・アラブ共和国", "赤は国を守る剣を、白は国民の善を、黒はこれまでの戦いを、２つの緑の星は美しい大地とアラブ諸国の団結を表している。", "img/SYL.gif"),
        new Quiz("ヨルダン・ハシミテ王国", "初代イラク国王が考案したといわれている。赤は聖者マホメットを、黒、白、緑はイスラムのそれぞれの王朝を表すとされ、白い７つの光を放つ星（七稜星）は、コーランの第１節の第７行への敬意を示すものといわれている。", "img/JOL.gif"),
      ]
    ],

    // 北アメリカ
    [
      // 大陸地域
      [
        new Quiz("アメリカ合衆国", "50の星は現在の州の数、13の赤白の条（すじ）は独立時の州の数を表わす。星と条でできているので星条旗（せいじょうき）ともいう。初代大統領ワシントンは「星は天を、赤は母国なるイギリスを、赤地を横切る白い条は母国イギリスからの独立を表す」といっている。", "img/USL.gif"),
        new Quiz("カナダ", "はじめイギリスの商船旗で赤地にユニオン・ジャックと紋章を入れたものだったが、イギリス以外の移民も多くなり、現在の国旗になった。国旗中央の模様は、国の木であるカエデの葉。", "img/CAL.gif"),
        new Quiz("メキシコ合衆国", "緑、白、赤は、スペインから独立するときに掲げた「３つの保障」諸州の独立（緑）と宗教の純粋性（白）と諸民族の統一（赤）を表している。", "img/MXL.gif")
      ],

      // 地峡地帯
      [
        new Quiz("ベリーズ", "青は海と近隣諸国との協調を、赤は国土と独立の決意を表している。紋章にはこの国で働く住民や帆船、道具類、マホガニーなどが画かれている。", "img/BZL.gif"),
        new Quiz("コスタリカ共和国", "青は海（カリブ海、太平洋）、空、希望を、白は平和、領土の資源を、赤は、情熱、献心、愛国を表している。スポーツなど民間使用の時は、中央左側にある紋章が省かれる。", "img/CRL.gif"),
        new Quiz("エルサルバドル共和国", "青は太平洋とカリブ海を、白は平和を表している。国章には、中央アメリカ連邦を形成していた５つの国を表す５つの山と虹、そして外国からの開放を象徴する「フリジア帽（自由の帽子）」が描かれている。", "img/SVL.gif"),
        new Quiz("グアテマラ共和国", "両側の青は太平洋とカリブ海を、白は平和への願いを表している。中央の紋章（国章）に描かれている尾が長い鳥はケツァールといい、飼育が難しく、誰にも飼うことができない（支配されない）「自由の鳥」として大切にされている。", "img/GTL.gif"),
        new Quiz("ホンジュラス共和国", "５つの星は中央アメリカ連邦を形成していた５つの国を表している。", "img/HNL.gif"),
        new Quiz("ニカラグア共和国", "青は海を、白は正義を表している。中央の紋章（国章）には、連邦を形成していた５つの国を表す５つの山と虹、そして外国からの開放を象徴する「フリジア帽（自由の帽子）」が描かれている。", "img/NIL.gif"),
        new Quiz("パナマ共和国", "アメリカの星条旗を手本にして作られた。２大政党の共和派を赤で、保守派を青で、白は両者間の平和を表している。また、青い星は潔白と正直を、赤い星は権威と法を表している。", "img/PAL.gif")
      ],

      // バハマ諸島
      [
        new Quiz("バハマ国", "青が海（カリブ海と大西洋）とバハマ島の海岸を、黄色が国土と太陽を、黒い三角形は約80％をしめる黒人を表している。", "img/BSL.gif")
      ],

      // 大アンティル諸島
      [
        new Quiz("キューバ共和国", "赤が独立のために流された血と正義と力を、白は独立の精神を、３本の青い線は独立時の３州を、白い星は輝かしい未来を、三角形は自由、平等、博愛を表している。", "img/CUL.gif"),
        new Quiz("ドミニカ共和国", "ハイチの国旗をもとにして作られた。赤は独立のために流された血を、青は平和を、白の十字は汚れのない精神を表している。中央に国章が配され、その国章の上部のリボンには国の標語「神、祖国、自由」が、下部のリボンには国名が記されている。", "img/DOL.gif"),
        new Quiz("ハイチ共和国", "中央にあるのは国章で、ヤシの木、軍旗、大砲、小銃、弾丸、太鼓、トランペット、錨（いかり）などが画かれている。下方にあるリボンにはフランス語で「団結は力なり」という国の標語が書かれている。", "img/HTL.gif"),
        new Quiz("ジャマイカ", "緑は希望と農業を、黒は国民を、黄の十字は聖アンデレの十字架で、国民が熱心なキリスト教徒であることを表している。", "img/JML.gif")
      ]

      // 小アンティル諸島
      [
        new Quiz("アンティグア・バーブーダ", "黒は住民の大部分を占めるアフリカ系の黒人を、太陽は新時代の象徴を、青は希望を、赤は国民の力を表している。", "img/AGL.gif"),
        new Quiz("バルバドス", "青は海（大西洋とカリブ海）と空を、黄色は国土を、中央の三つ又は海の守護神、ギリシア神話のポセイドン（ローマ神話のネプチューン）の持つ鉾（ほこ）で国の守りを表している。", "img/BBL.gif"),
        new Quiz("ドミニカ国", "緑が国土を、黒が国民の大多数をしめる黒人の伝統を、白は純粋を、黄はインディオと柑橘類、バナナ、太陽を表している。また、３色の十字は国民の信仰を、赤い円は社会主義を、10の星は10の地方を表している。鳥は国鳥のオウム。", "img/DML.gif"),
        new Quiz("グレナダ", "赤は国民の情熱と勇気を、緑は豊かな土地と農業を、黄は太陽と国土、国民の友情と真心を、中央とまわりの７つの星はこの国の７つの行政区を表している。左側にある模様は特産物のナツメグの実。", "img/GDL.gif"),
        new Quiz("セントルシア", "青はカリブ海と大西洋を、三角は国土を、黄は太陽の光を、白と黒は白人と黒人の協調を表している。", "img/LCL.gif"),
        new Quiz("セントクリストファー・ネイビス", "２つの星は、この国を構成する２島を、緑は農業、黒は国民、黄色は富、赤は独立を表す。", "img/KNL.gif"),
        new Quiz("セントビンセント及びグレナディーン諸島", "青は海と空、黄は太陽と国土、緑は植物資源を、緑の３つの菱形はこの国を構成する３島を表している。", "img/VCL.gif"),
        new Quiz("トリニダード・トバゴ共和国", "赤が太陽と資源と国民の活力、勇気、友情を、黒が力と理想を、２本の白い線は人類が平等であることと、この国を構成する２島を表している。", "img/TTL.gif")
      ]
    ]
  ],

  // 元素番号 → 元素記号・元素名
  [
    [
      // １～１０
      [
        new Quiz("H 水素", "１番", null),
        new Quiz("He ヘリウム", "２番", null),
        new Quiz("Li リチウム", "３番", null),
        new Quiz("Be ベリリウム", "４番", null),
        new Quiz("B 硼素", "５番", null),
        new Quiz("C 炭素", "６番", null),
        new Quiz("N 窒素", "７番", null),
        new Quiz("O 酸素", "８番", null),
        new Quiz("F 弗素", "９番", null),
        new Quiz("Ne ネオン", "１０番", null)
      ],

      // １１～２０
      [
        new Quiz("Na ナトリウム", "１１番", null),
        new Quiz("Mg マグネシウム", "１２番", null),
        new Quiz("Al アルミニウム", "１３番", null),
        new Quiz("Si 珪素", "１４番", null),
        new Quiz("P 燐", "１５番", null),
        new Quiz("S 硫黄", "１６番", null),
        new Quiz("Cl 塩素", "１７番", null),
        new Quiz("Ar アルゴン", "１８番", null),
        new Quiz("K カリウム", "１９番", null),
        new Quiz("Ca カルシウム", "２０番", null)
      ],

      // ２１～３０
      [
        new Quiz("Sc スカンジウム", "２１番", null),
        new Quiz("Ti チタン", "２２番", null),
        new Quiz("V バナジウム", "２３番", null),
        new Quiz("Cr クロム", "２４番", null),
        new Quiz("Mn マンガン", "２５番", null),
        new Quiz("Fe 鉄", "２６番", null),
        new Quiz("Co コバルト", "２７番", null),
        new Quiz("Ni ニッケル", "２８番", null),
        new Quiz("Cu 銅", "２９番", null),
        new Quiz("Zn 亜鉛", "３０番", null)
      ],

      // ３１～４０
      [
        new Quiz("Ga ガリウム", "３１番", null),
        new Quiz("Ge ゲルマニウム", "３２番", null),
        new Quiz("As 砒素", "３３番", null),
        new Quiz("Se セレン", "３４番", null),
        new Quiz("Br 臭素", "３５番", null),
        new Quiz("Kr クリプトン", "３６番", null),
        new Quiz("Rb ルビジウム", "３７番", null),
        new Quiz("Sr ストロンチウム", "３８番", null),
        new Quiz("Y イットリウム", "３９番", null),
        new Quiz("Zr ジルコニウム", "４０番", null)
      ],

      // ４１～５０
      [
        new Quiz("Nb ニオブ", "４１番", null),
        new Quiz("Mo モリブデン", "４２番", null),
        new Quiz("Tc テクネチウム", "４３番", null),
        new Quiz("Ru ルテニウム", "４４番", null),
        new Quiz("Rh ロジウム", "４５番", null),
        new Quiz("Pd パラジウム", "４６番", null),
        new Quiz("Ag 銀", "４７番", null),
        new Quiz("Cd カドミウム", "４８番", null),
        new Quiz("In インジウム", "４９番", null),
        new Quiz("Sn 錫", "５０番", null)
      ],

      // ５１～６０
      [
        new Quiz("Sb アンチモン", "５１番", null),
        new Quiz("Te テルル", "５２番", null),
        new Quiz("I 沃素", "５３番", null),
        new Quiz("Xe キセノン", "５４番", null),
        new Quiz("Cs セシウム", "５５番", null),
        new Quiz("Ba バリウム", "５６番", null),
        new Quiz("La ランタン", "５７番", null),
        new Quiz("Ce セリウム", "５８番", null),
        new Quiz("Pr プラセオジム", "５９番", null),
        new Quiz("Nd ネオジム", "６０番", null)
      ],

      // ６１～７０
      [
        new Quiz("Pm プロメチウム", "６１番", null),
        new Quiz("Sm サマリウム", "６２番", null),
        new Quiz("Eu ユーロピウム", "６３番", null),
        new Quiz("Gd ガドリニウム", "６４番", null),
        new Quiz("Tb テルビウム", "６５番", null),
        new Quiz("Dy ジスプロシウム", "６６番", null),
        new Quiz("Ho ホルミウム", "６７番", null),
        new Quiz("Er エルビウム", "６８番", null),
        new Quiz("Tm ツリウム", "６９番", null),
        new Quiz("Yb イッテルビウム", "７０番", null)
      ],

      // ７１～８０
      [
        new Quiz("Lu ルテチウム", "７１番", null),
        new Quiz("Hf ハフニウム", "７２番", null),
        new Quiz("Ta タンタル", "７３番", null),
        new Quiz("W タングステン", "７４番", null),
        new Quiz("Re レニウム", "７５番", null),
        new Quiz("Os オスミウム", "７６番", null),
        new Quiz("Ir イリジウム", "７７番", null),
        new Quiz("Pt 白金", "７８番", null),
        new Quiz("Au 金", "７９番", null),
        new Quiz("Hg 水銀", "８０番", null)
      ],

      // ８１～９０
      [
        new Quiz("Tl タリウム", "８１番", null),
        new Quiz("Pb 鉛", "８２番", null),
        new Quiz("Bi ビスマス", "８３番", null),
        new Quiz("Po ポロニウム", "８４番", null),
        new Quiz("At アスタチン", "８５番", null),
        new Quiz("Rn ラドン", "８６番", null),
        new Quiz("Fr フランシウム", "８７番", null),
        new Quiz("Ra ラジウム", "８８番", null),
        new Quiz("Ac アクチニウム", "８９番", null),
        new Quiz("Th トリウム", "９０番", null)
      ],

      // ９１～１００
      [
        new Quiz("Pa プロトアクチニウム", "９１番", null),
        new Quiz("U ウラン", "９２番", null),
        new Quiz("Np ネプツニウム", "９３番", null),
        new Quiz("Pu プルトニウム", "９４番", null),
        new Quiz("Am アメリシウム", "９５番", null),
        new Quiz("Cm キュリウム", "９６番", null),
        new Quiz("Bk バークリウム", "９７番", null),
        new Quiz("Cf カリホルニウム", "９８番", null),
        new Quiz("Es アインスタイニウム", "９９番", null),
        new Quiz("Fm フェルミウム", "１００番", null)
      ],

      // １０１～１１０
      [
        new Quiz("Md メンデレビウム", "１０１番", null),
        new Quiz("No ノーベリウム", "１０２番", null),
        new Quiz("Lr ローレンシウム", "１０３番", null),
        new Quiz("Rf ラザホージウム", "１０４番", null),
        new Quiz("Db ドブニウム", "１０５番", null),
        new Quiz("Sg シーボーギウム", "１０６番", null),
        new Quiz("Bh ボーリウム", "１０７番", null),
        new Quiz("Hs ハッシウム", "１０８番", null),
        new Quiz("Mt マイトネリウム", "１０９番", null),
        new Quiz("Ds ダームスタチウム", "１１０番", null)
      ],

      // １１１～１１８
      [
        new Quiz("Rg レントゲニウム", "１１１番", null),
        new Quiz("Cn コペルニシウム", "１１２番", null),
        new Quiz("Nh ニホニウム", "１１３番", null),
        new Quiz("Fl フレロビウム", "１１４番", null),
        new Quiz("Mc モスコビウム", "１１５番", null),
        new Quiz("Lv リバモリウム", "１１６番", null),
        new Quiz("Ts テネシン", "１１７番", null),
        new Quiz("Og オガネソン", "１１８番", null)
      ]
    ]
  ],

  // モールス符号
  [
    // 欧文
    [
      // A~I
      [
        new Quiz("A", "<audio src='img/a.mp3' autoplay controls>", null),
        new Quiz("B", "<audio src='img/b.mp3' autoplay controls>", null),
        new Quiz("C", "<audio src='img/c.mp3' autoplay controls>", null),
        new Quiz("D", "<audio src='img/d.mp3' autoplay controls>", null),
        new Quiz("E", "<audio src='img/e.mp3' autoplay controls>", null),
        new Quiz("F", "<audio src='img/f.mp3' autoplay controls>", null),
        new Quiz("G", "<audio src='img/g.mp3' autoplay controls>", null),
        new Quiz("H", "<audio src='img/h.mp3' autoplay controls>", null),
        new Quiz("I", "<audio src='img/i.mp3' autoplay controls>", null)
      ],

      // J~R
      [
        new Quiz("J", "<audio src='img/j.mp3' autoplay controls>", null),
        new Quiz("K", "<audio src='img/k.mp3' autoplay controls>", null),
        new Quiz("L", "<audio src='img/l.mp3' autoplay controls>", null),
        new Quiz("M", "<audio src='img/m.mp3' autoplay controls>", null),
        new Quiz("N", "<audio src='img/n.mp3' autoplay controls>", null),
        new Quiz("O", "<audio src='img/o.mp3' autoplay controls>", null),
        new Quiz("P", "<audio src='img/p.mp3' autoplay controls>", null),
        new Quiz("Q", "<audio src='img/q.mp3' autoplay controls>", null),
        new Quiz("R", "<audio src='img/r.mp3' autoplay controls>", null)
      ],

      // S~Z
      [
        new Quiz("S", "<audio src='img/s.mp3' autoplay controls>", null),
        new Quiz("T", "<audio src='img/t.mp3' autoplay controls>", null),
        new Quiz("U", "<audio src='img/u.mp3' autoplay controls>", null),
        new Quiz("V", "<audio src='img/v.mp3' autoplay controls>", null),
        new Quiz("W", "<audio src='img/w.mp3' autoplay controls>", null),
        new Quiz("X", "<audio src='img/x.mp3' autoplay controls>", null),
        new Quiz("Y", "<audio src='img/y.mp3' autoplay controls>", null),
        new Quiz("Z", "<audio src='img/z.mp3' autoplay controls>", null)
      ]
    ]
  ],

  // 日本国憲法
  [
    // 第１章 天皇
    [
      // 第１条～第８条
      [
        new Quiz("天皇の地位と主権在民", "第１条", null),
        new Quiz("皇位の世襲", "第２条", null),
        new Quiz("内閣の助言と承認及び責任", "第3条", null),
        new Quiz("天皇の権能と権能行使の委任", "第４条", null),
        new Quiz("摂政", "第５条", null),
        new Quiz("天皇の任命行為", "第6条", null),
        new Quiz("天皇の国事行為", "第７条", null),
        new Quiz("財産授受の制限", "第８条", null)
      ]
    ],

    // 第２章 戦争の放棄
    [
      // 第９条
      [
        new Quiz("戦争の放棄と戦力及び交戦権の否認", "第９条", null)
      ]
    ],

    // 第３章 国民の権利及び義務
    [
      // 第１０条～第１９条
      [
        new Quiz("国民たる要件", "第１０条", null),
        new Quiz("基本的人権", "第１１条", null),
        new Quiz("自由及び権利の保持義務と公共福祉性", "第１２条", null),
        new Quiz("個人の尊重と公共の福祉", "第１３条", null),
        new Quiz("平等原則、貴族制度の否認及び栄典の限界", "第１４条", null),
        new Quiz("公務員の選定罷免権、公務員の本質、普通選挙の保証及び投票秘密の保証", "第１５条", null),
        new Quiz("請願権", "第１６条", null),
        new Quiz("公務員の不法行為による損害の賠償", "第１７条", null),
        new Quiz("奴隷的拘束及び苦役の禁止", "第１８条", null),
        new Quiz("思想及び良心の自由", "第１９条", null)
      ],

      // 第２０条～第２９条
      [
        new Quiz("信教の自由", "第２０条", null),
        new Quiz("集会、結社及び表現の自由と通信秘密の保護", "第２１条", null),
        new Quiz("居住、移転、職業選択、外国移住及び国籍離脱の自由", "第２２条", null),
        new Quiz("学問の自由", "第２３条", null),
        new Quiz("家族関係における個人の尊厳と両性の平等", "第２４条", null),
        new Quiz("生存権及び国民生活の社会的進歩向上に努める国の義務", "第２５条", null),
        new Quiz("教育を受ける権利と受けさせる義務", "第２６条", null),
        new Quiz("勤労の権利と義務、勤労条件の基準及び児童酷使の禁止", "第２７条", null),
        new Quiz("勤労者の団結権及び団体行動権", "第２８条", null),
        new Quiz("財産権", "第２９条", null)
      ],

      // 第３０条～第４０条
      [
        new Quiz("納税の義務", "第３０条", null),
        new Quiz("生命及び自由の保障と科刑の制約", "第３１条", null),
        new Quiz("裁判を受ける権利", "第３２条", null),
        new Quiz("逮捕の制約", "第３３条", null),
        new Quiz("抑留及び拘禁の制約", "第３４条", null),
        new Quiz("侵入、捜索及び押収の制約", "第３５条", null),
        new Quiz("拷問及び残虐な刑罰の禁止", "第３６条", null),
        new Quiz("刑事被告人の権利", "第３７条", null),
        new Quiz("自白強要の禁止と自白の証拠能力の限界", "第３８条", null),
        new Quiz("遡及処罰、二重処罰等の禁止", "第３９条", null),
        new Quiz("刑事補償", "第４０条", null)
      ]
    ],

    // 第４章 国会
    [
      // 第４１条～第５２条
      [
        new Quiz("国会の地位", "第４１条", null),
        new Quiz("二院制", "第４２条", null),
        new Quiz("両議院の組織", "第４３条", null),
        new Quiz("議員及び選挙人の資格", "第４４条", null),
        new Quiz("衆議院議員の任期", "第４５条", null),
        new Quiz("参議院議員の任期", "第４６条", null),
        new Quiz("議員の選挙", "第４７条", null),
        new Quiz("両議院議員相互兼職の禁止", "第４８条", null),
        new Quiz("議員の歳費", "第４９条", null),
        new Quiz("議員の不逮捕特権", "第５０条", null),
        new Quiz("議員の発言表決の無答責", "第５１条", null),
        new Quiz("常会", "第５２条", null)
      ],

      // 第５３条～第６４条
      [
        new Quiz("臨時会", "第５３条", null),
        new Quiz("総選挙、特別会及び緊急集会", null),
        new Quiz("資格争訟", "第５５条", null),
        new Quiz("議事の定足数と過半数議決", "第５６条", null),
        new Quiz("会議の公開と会議録", "第５７条", null),
        new Quiz("役員の選任及び議員の自律権", "第５８条", null),
        new Quiz("法律の成立", "第５９条", null),
        new Quiz("衆議院の予算先議権及び予算の議決", "第６０条", null),
        new Quiz("条約締結の承認", "第６１条", null),
        new Quiz("議院の国政調査権", "第６２条", null),
        new Quiz("国務大臣の出席", "第６３条", null),
        new Quiz("弾劾裁判所", "第６４条", null)
      ]
    ],

    // 第５章 内閣
    [
      // 第６５条～第７５条
      [
        new Quiz("行政権の帰属", "第６５条", null),
        new Quiz("内閣の組織と責任", "第６６条", null),
        new Quiz("内閣総理大臣の指名", "第６７条", null),
        new Quiz("国務大臣の任免", "第６８条", null),
        new Quiz("不信任決議と解散または総辞職", "第６９条", null),
        new Quiz("内閣総理大臣の欠缺又は総選挙施行による総辞職", "第７０条", null),
        new Quiz("総辞職後の職務続行", "第７１条", null),
        new Quiz("内閣総理大臣の職務権限", "第７２条", null),
        new Quiz("内閣の職務権限", "第７３条", null),
        new Quiz("法律及び政令への署名と連署", "第７４条", null),
        new Quiz("国務大臣訴追の制約", "第７５条", null)
      ]
    ],

    // 第６章 司法
    [
      // 第７６条～第８２条
      [
        new Quiz("司法権の機関と裁判官の職務上の独立", "第７６条", null),
        new Quiz("最高裁判所の規則制定権", "第７７条", null),
        new Quiz("裁判官の身分の保障", "第７８条", null),
        new Quiz("最高裁判所の構成及び裁判官任命の国民審査", "第７９条", null),
        new Quiz("下級裁判所の裁判官", "第８０条", null),
        new Quiz("最高裁判所の法令審査権", "第８１条", null),
        new Quiz("対審及び判決の公開", "第８２条", null)
      ]
    ],

    // 第７章 財政
    [
      // 第８３条～第９１条
      [
        new Quiz("財政処理の要件", "第８３条", null),
        new Quiz("課税の要件", "第８４条", null),
        new Quiz("国費支出及び債務負担の要件", "第８５条", null),
        new Quiz("予算の作成", "第８６条", null),
        new Quiz("予備費", "第８７条", null),
        new Quiz("皇室財産及び皇室費用", "第８８条", null),
        new Quiz("公の財産の用途制限", "第８９条", null),
        new Quiz("会計検査", "第９０条", null),
        new Quiz("財政状況の報告", "第９１条", null)
      ]
    ],

    // 第８章 地方自治
    [
      // 第９２条～第９５条
      [
        new Quiz("地方自治の本旨の確保", "第９２条", null),
        new Quiz("地方公共団体の機関", "第９３条", null),
        new Quiz("地方公共団体の権能", "第９４条", null),
        new Quiz("地方公共団体のみに適用される特別法", "第９５条", null)
      ]
    ],

    // 第９章 改正
    [
      // 第９６条
      [
        new Quiz("憲法改正の発議、国民投票及び公布", "第９６条", null)
      ]
    ],

    // 第１０章 最高法規
    [
      // 第９７条～第９９条
      [
        new Quiz("基本的人権の由来特質", "第９７条", null),
        new Quiz("憲法の最高性条約及び国際法規の遵守", "第９８条", null),
        new Quiz("憲法尊重擁護の義務", "第９９条", null)
      ]
    ],

    // 第１１章 補則
    [
      // 第１００条～第１０３条
      [
        new Quiz("施行期日と施工前の準備行為", "第１００条", null),
        new Quiz("参議院成立前の国会", "第１０１条", null),
        new Quiz("参議院議員の任期の経過的特例", "第１０２条", null),
        new Quiz("公務員の地位に関する経過規定", "第１０３条", null)
      ]
    ]
  ],

  // 百人一首
  [
    [
      // １～１０
      [
        new Quiz("わがころも手は露に濡れつつ", "秋の田のかりほの庵の苫を荒み", null),
        new Quiz("ころもほすてふあまの香具山", "春すぎて夏来にけらし白たへの", null),
        new Quiz("ながながし夜をひとりかも寝む", "あしひきの山鳥の尾のしだり尾の", null),
        new Quiz("富士の高嶺に雪は降りつつ", "田子の浦にうちいでて見れば白たへの", null),
        new Quiz("声聞く時ぞ秋は悲しき", "奥山にもみぢ踏み分け鳴く鹿の", null),
        new Quiz("白きを見れば夜ぞふけにける", "かささぎの渡せる橋に置く霜の", null),
        new Quiz("み笠の山にいでし月かも", "あまの原ふりさけ見ればかすがなる", null),
        new Quiz("世を宇治山と人は言ふなり", "わが庵は都のたつみしかぞ住む", null),
        new Quiz("わが身世にふるながめせしまに", "花の色はうつりにけりないたづらに", null),
        new Quiz("知るも知らぬも逢坂の関", "これやこの行くも帰るも別れては", null)
      ]
    ]
  ]
]

let state = -1
let times = 0
let quiz
let quizIndex

let count = 0


for (let i in quizList) {
  for (let j in quizList[i]) {
    $("#btn"+i+"-"+j).on("click", () => {
      let v = $("input[name=radios"+i+"-"+j+"]:checked", "#form"+i+"-"+j).val()
      if (v == undefined) return

      let lh = $("#listH"+i).text()
      let l = $("label[for=radio"+i+"-"+j+"-"+v+"]").text()
      $("#headerTitle").text(lh+" ["+l+"]")
      Move("lobby", "quiz")

      setQuiz(i, j, v)
      showQuiz(0)
    })
  }
}



function setQuiz(i, j, v) {
  quiz = Shuffle(quizList[i][j][v])
  quizIndex = []

  let flg
  let t = 0
  let l = quiz.length

  do {
    flg = false
    for (let i = Math.min(t, l-1); i >= 0; i--) {
      if (quiz[i].step()) {
        quizIndex.push(i)
        flg = true
      }
    }
    t++
  } while (flg)
}


function showQuiz(t) {
  state = 0

  let i = quizIndex[t]
  $("#question").html(quiz[i].q)
  $("#q_img").attr("src", quiz[i].img)
  $("#quizCount").text((t+1) + " / "+quizIndex.length)

  $("#answer").html("")
}

function showAnswer(t) {
  state = 1

  let i = quizIndex[t]
  $("#answer").html(quiz[i].a)
}


function exam() {
  $("#exam").html("")
  Move("quiz", "exam")

  state = 2

  for (let i in quiz) {
    let q = quiz[i]
    $("#exam").append("Q" + (parseInt(i)+1) + ". " + q.q + "<br>")
    if (q.img != null) $("#exam").append("<img class='img-fluid mx-auto d-block shadow' src='"+q.img+"'></img><br>")
    $("#exam").append("<br>")
    if (i != quiz.length-1) $("#exam").append("<hr>")
  }
}


$("html").keydown(e => {
  if (e.which == 13) Enter()
  else if (e.which == 27) exam()
})

function Enter() {
  if (state == -1) return false
  else if (state == 0) showAnswer(times)
  else if (state == 1) {
    times++
    if (times < quizIndex.length) showQuiz(times)
    else exam()
  }
}