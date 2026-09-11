const ACH=[
{id:'first',title:'駆け出しハンター',desc:'初めてクエストを達成',ok:s=>s.totalDone>=1},
{id:'ten',title:'働き者',desc:'クエスト10回達成',ok:s=>s.totalDone>=10},
{id:'fifty',title:'ギルドの常連',desc:'クエスト50回達成',ok:s=>s.totalDone>=50},
{id:'firstboss',title:'一人前の狩人',desc:'初めてボス討伐',ok:s=>s.bestiary.length>=1},
{id:'ancient',title:'龍殺し',desc:'古龍級を討伐',ok:s=>s.bestiary.some(x=>x.tierKey==='ancient')},
{id:'streak7',title:'七日連戦',desc:'7日連続で学習',ok:s=>s.streak.current>=7},
{id:'streak30',title:'不屈の学究者',desc:'30日連続で学習',ok:s=>s.streak.current>=30},
{id:'study50',title:'五十時間の証',desc:'累計50時間学習',ok:s=>totalMinutes(s)>=3000},
{id:'fullwolf',title:'黒狼を纏う者',desc:'黒狼防具5部位を作成',ok:s=>['head_wolf','chest_wolf','arms_wolf','waist_wolf','legs_wolf'].every(id=>s.craftedGear.includes(id))},
{id:'fullabyss',title:'深淵の覇者',desc:'深淵王防具5部位を作成',ok:s=>['head_abyss','chest_abyss','arms_abyss','waist_abyss','legs_abyss'].every(id=>s.craftedGear.includes(id))},
{id:'fullastral',title:'星界の王',desc:'天煌星防具5部位を作成',ok:s=>['head_astral','chest_astral','arms_astral','waist_astral','legs_astral'].every(id=>s.craftedGear.includes(id))}
];
let state=blankState(), gearSlot='weapon', selectedGear=null;