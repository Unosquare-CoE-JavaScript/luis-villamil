class Mediator
{
  constructor() {
      this.participants = [];
  }

  addParticipant(p) {
    this.participants.push(p);
    Mediator.counter++; 
    return Mediator.counter;
  }

  broadcast(broadcasterId, value) {
    for (const participant of this.participants) {
        if (participant.id !== broadcasterId) {
            participant.increase(value);
        }
    }
  }
}
Mediator.counter = 0;

class Participant
{
  constructor(mediator)
  {
    this.value = 0;
    this.id = mediator.addParticipant(this);
    this.mediator = mediator;
  }

  say(n)
  {
    this.mediator.broadcast(this.id, n);
  }

  increase(val) {
      this.value += val;
  }
}

const mediator = new Mediator();
const p1 = new Participant(mediator);
const p2 = new Participant(mediator);

console.log(p1.value);
console.log(p2.value);
p1.say(3);
console.log('########')
console.log(p1.value);
console.log(p2.value);
p2.say(2);
console.log('########')
console.log(p1.value);
console.log(p2.value);