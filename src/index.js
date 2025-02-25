class Racer {
    name;
    speed;
    skill;
    power;
    points;
    number;

    static racersList = []

    constructor(name, speed, skill, power, points){
        this.name = name
        this.speed = speed
        this.skill = skill
        this.power = power
        this.points = points
        Racer.racersList.push(this)
    }
}

new Racer('Mario', 4, 3, 3, 0)
new Racer('Peach', 3, 4, 2, 0)
new Racer('Yoshi', 2, 4, 3, 0)
new Racer('Bowser', 5, 2, 5, 0)
new Racer('Luigi', 3, 4, 4, 0)
new Racer('Donkey Kong', 2, 2, 5, 0)

async function getRollDice(){
    return Math.floor(Math.random() * 6) + 1
}

async function defineRacer1(){
    let randomNumberRacer = Math.floor(Math.random() * Racer.racersList.length) + 1
    let racer1 = Racer.racersList[randomNumberRacer - 1]

    return racer1
}

async function defineRacer2(racer1){
    let randomNumberRacer = Math.floor(Math.random() * Racer.racersList.length) + 1
    let racer2 = Racer.racersList[randomNumberRacer - 1]

    while(racer2 === racer1){
        randomNumberRacer = Math.floor(Math.random() * Racer.racersList.length) + 1
        racer2 = Racer.racersList[randomNumberRacer - 1]
    }

    return racer2
}

async function drawRaceTrack(){
    let random = Math.random()
    let raceTrack 

    switch (true) {
        case random <= 0.33:
            raceTrack = 'RETA'
            break;

        case random > 0.33 && random <= 0.66:
            raceTrack = 'DRIFT'
            break;
    
        default:
            raceTrack = 'CONFRONTO'
            break;
    }

    return raceTrack
}

async function logRollDice(racer, track, diceResult, attribute){
    console.log(`${racer} rolou um dado de ${track} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function engineGameRace(racer1, racer2){
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}\n`);

        let track = await drawRaceTrack()
        console.log(`Pista: ${track} 🏎️ \n`);

        let dice1 = await getRollDice()
        let dice2 = await getRollDice()

        let totalAtributtePoints1 = 0
        let totalAtributtePoints2 = 0
        
        if(track === 'RETA'){

            totalAtributtePoints1 = dice1 + racer1.speed
            totalAtributtePoints2 = dice2 + racer2.speed

            await logRollDice(racer1.name, 'velocidade', dice1, racer1.speed)
            await logRollDice(racer2.name, 'velocidade', dice2, racer2.speed)

        } else if(track === 'DRIFT'){

            totalAtributtePoints1 = dice1 + racer1.skill
            totalAtributtePoints2 = dice2 + racer2.skill

            await logRollDice(racer1.name, 'habilidade', dice1, racer1.skill)
            await logRollDice(racer2.name, 'habilidade', dice2, racer2.skill)

        } else{

            let powerAtributtePoints1 = dice1 + racer1.power
            let powerAtributtePoints2 = dice2 + racer2.power

            await logRollDice(racer1.name, 'poder', dice1, racer1.power)
            await logRollDice(racer2.name, 'poder', dice2, racer2.power)

            if(powerAtributtePoints1 > powerAtributtePoints2 && racer2.points > 0){
                racer2.points--;
                console.log(`${racer2.name} perdeu um ponto!`);
            } else if(powerAtributtePoints2 > powerAtributtePoints1 && racer1.points > 0){
                racer1.points--;
                console.log(`${racer1.name} perdeu um ponto!`);
            } 

            if (powerAtributtePoints2  === powerAtributtePoints1) {
                console.log("Confronto empatado! Nenhum ponto foi perdido");
            }
        }

        if (totalAtributtePoints1 > totalAtributtePoints2){
            racer1.points++;
            console.log(`${racer1.name} marcou um ponto!`);
        } else if(totalAtributtePoints2 > totalAtributtePoints1){
            racer2.points++;
            console.log(`${racer2.name} marcou um ponto!`);
        }

        console.log(`${racer1.name}: ${racer1.points} ponto(s)`);
        console.log(`${racer2.name}: ${racer2.points} ponto(s)`);

        console.log(`----------------------------\n`);
    }
}

async function getWinner(racer1, racer2){
    console.log(`Resultado final:`);
    console.log(`${racer1.name}: ${racer1.points} ponto(s)`);
    console.log(`${racer2.name}: ${racer2.points} ponto(s)`);
    
    if(racer1.points > racer2.points){
        console.log(`${racer1.name} ganhou a corrida!`);
    } else if(racer2.points > racer1.points){
        console.log(`${racer2.name} ganhou a corrida!`);
    } else{
        console.log(`A corrida terminou empatada`)
    }
}

(async function main(){
    console.log(` 🏁 Corrida entre corredores começando...\n`);

    let racer1 = await defineRacer1()
    let racer2 = await defineRacer2(racer1)
    
    console.log(` 🥊 ${racer1.name} VS ${racer2.name} 🥊 \n`);

    await engineGameRace(racer1, racer2)
    await getWinner(racer1, racer2)
})()