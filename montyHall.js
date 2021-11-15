/* 
	Simulation of the monty hall problem.
	https://youtu.be/4Lb-6rxZxx0
	https://youtu.be/TVq2ivVpZgQ
*/

const doors = ["goat", "goat", "goat"];

function percentage(partialValue, totalValue) {
  return Math.floor((100 * partialValue) / totalValue);
}

function getRandomArbitrary(min, max) {
  const rand = Math.random() * (max - min) + min;
  if (rand - Math.floor(rand) > 0.5) {
    return Math.ceil(rand);
  } else {
    return Math.floor(rand);
  }
}

function fillRandomDoor(doors, value, numberOfDoors) {
  const randomIndex = Math.floor(Math.random() * numberOfDoors);
  doors[randomIndex] = value;
}

function selectDoor() {
  return getRandomArbitrary(1, 3);
}

function revealGoat(choosenDoor, doors) {
  return doors.findIndex((door, index) => {
    if (door == "goat" && index != choosenDoor) {
      return true;
    }
  });
}

function revealDoor(doors, chosenDoor, goatDoorNumber, toSwitch) {
  if (toSwitch == "random") {
    toSwitch = Boolean(getRandomArbitrary(0, 1));
  }
  console.log(toSwitch);
  // if you decided not to switch, I'll just return the chosen door.
  if (!toSwitch) {
    return doors[chosenDoor];
  } else {
    // if you decided to switch, i will look for the door that you didn't choose and the door that i didn't reveal earlier
    return doors.find((door, index) => {
      if (index != chosenDoor && index != goatDoorNumber) {
        return true;
      }
    });
  }
}

function runGame(toSwitch, gameStats) {
  doors.fill("goat");

  // Fill a random door with a tesla
  fillRandomDoor(doors, "Tesla", 3);

  // Select a random door out of the 3 doors
  const chosenDoor = selectDoor();

  // Find a door that have a goat out of the 2 doors left
  const goatDoorNumber = revealGoat(chosenDoor - 1, doors);

  // Get the chosen door, or switch to the other door
  const revealedDoor = revealDoor(
    doors,
    chosenDoor - 1,
    goatDoorNumber,
    toSwitch
  );
  if (revealedDoor == "Tesla") {
    gameStats.gamesWon++;
  } else if (revealedDoor == "goat") {
    gameStats.gamesLost++;
  }
}

function runSimulation(size, toSwitch) {
  const gameStats = {
    gamesWon: 0,
    gamesLost: 0,
  };

  for (let i = 0; i < size; i++) {
    runGame(toSwitch, gameStats);
  }

  console.log("Total games:", size);
  console.log("Games won:", gameStats.gamesWon);
  console.log("Games lost:", gameStats.gamesLost);
  console.log(
    "Percentage of games won: " + percentage(gameStats.gamesWon, size) + "%"
  );
}

// toSwitch can be
// - true: always switch
// - false: never switch
// - random: sometimes will switch sometimes it will not

const numberOfGames = 10000;
const toSwitch = "random";

runSimulation(numberOfGames, toSwitch);
