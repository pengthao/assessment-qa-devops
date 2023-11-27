/*
Does the score show up correctly?
When I click see all bots, do they populate
when I click draw, does the page populate robots to choose from

instructions show to choose 2.
when I click on add to duo will it populate to the new list for me?
when I click remove will it remove it from my selection?
when I click more than 2 will it alert me that I've made my selection alredy?
When I click duel then the game will commence and tell me if I win or lose
When I win or lose my score will adjust accordingly
when I click play again it will prompt me to be able to play again

Test Plan:

Objective: Test the application by clicking all buttons as indicated by instructions
to identify if all functions are operating as expected, and document any issues.

Test case 1:
    -Ensure the game initializes correctly and displays choice buttons and score

    Steps:
        1. Start the game.
        2. Inspect the page for any visual/formatting issues.
        3.Verify if button elements and scores populate.

    Expected result: Page loads with correct styling, see all bots button
                     Draw button, and scores.


Test case 2: Player wins a round
    -Attempt the game as listed in instructions. Click draw.
     Select 2 bots and duel the computer's selected bots.Repeat until indication
     that you have won.

    Steps:
        1. Click the draw button.
        2. Observe if 5 bot cards are generated on the page.
        3. Click add to duo on the generated card.
        4. After click check to see if the bot card selected moves to 
           the selected area.
        5. Check to see if the selected bot has been removed from the available bots.
        6. Click on another add to duo button
        7. Check to see if the bot selected is removed from available section and added to the selected area.
        8. Click on the duel button.
        9. Observe if the dueling processing text shows up.
        10. Observe if the computer duo selected bots appear on the screen.
        11. Observe if the text changes to a status of win or loss.
        12. Observe if the score for wins and losses updates.
        13. Click the play again button.
        14. Observe if that resets the game for you to click 'draw' again.

    Observation:
        All except step 12 functioned properly.

    Bug report
        Bug: Incorrect scoring displayed
        Description: When the outcome is listed as a victory. The wins score does not go up.
                     Instead the loss score is incremented by one.

        Steps to reproduce:Follow test steps until a win condition has been met.
                           Observe the score when the win condition is met.

        Expected result: When the indicator informs you, that you have won. We expect the win score to increment by one.


Test case 3: See all bots
    -Check to see if the see all bots button displays all the bots.

    Steps: 
        1. Click see all bots button.
        2. Observe if all bots populate.
        3. Observe if the draw button is still selectable.
        4. Click the draw button to check if it functions properly.
        5. Refresh the page to check if the bots are cleared.

    Expected result: All bots populate on click. Draw button still functions. Refresh clears the bots.

---
Test Execution and Bug Documentation

    Test case 1:
        Result: Successfully loaded the page with all elements as expected.
        Observation: The styling, buttons, and score appeared. Score appeared as zero for wins and losses.

    Test case 2: Player wins a round
        Result: The bot selection and duel functions operated as expected.
                The scoring system is not functioning properly.
        Bug severity: high
        bug id: 001

    Test case 3:
        Result: Successfully displays all the bots
        Observations: On click all the bots appear and the draw button still functions as expected.


        
*/

const {
    makeRobotChoiceCard,
    makeRobotPlayerCard,
    makeRobotDisplayCard,
    renderChoices,
    renderCompDuo,
    renderPlayerDuo,
    chooseBot,
    putBotBack,
    drawFive,
    duel,
    reset,
    getPlayerStats,
    getAllBots
} = require('./public/index')

const bots = require('./src/botsData')

const drawFive = (bots) => {
    

};