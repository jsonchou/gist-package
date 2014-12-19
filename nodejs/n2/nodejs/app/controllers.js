function MsgListCtrl($scope) {
    $scope.polls = [];
}
// Voting / viewing poll results
function MsgItemCtrl($scope, $routeParams) {
    $scope.poll = {};
    $scope.vote = function () { };
}
// Creating a new poll
function MsgNewCtrl($scope) {
    $scope.poll = {
        question: '',
        choices: [{ text: '' }, { text: '' }, { text: '' }]
    };
    $scope.addChoice = function () {
        $scope.poll.choices.push({ text: '' });
    };
    $scope.createPoll = function () { };
}