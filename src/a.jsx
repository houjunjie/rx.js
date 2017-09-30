import React, { Component } from 'react';
import B from './b.jsx';

import { Observable, Subject } from 'rxjs';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';


import classNames from 'classnames/bind';
import style from './stylus.styl';


const cx = classNames.bind(style);


class A extends Component {
  constructor(props) {
    super(props);
    this.state = {
      self: 'A',
      count: 0
    }
  }
  componentDidMount() {
    var oBtn = document.querySelector('#btn');
    const click = Observable.fromEvent(oBtn, 'click');
    click
      .throttleTime(1000)
      .map((event) => {
        console.log(event);
        return event.clientX
      })
      .scan((count, clientX) => count + clientX, 0)
      .subscribe((count) => this.setState({
        count: count
      }));
    // Observable
    // let observable = Observable.create((observer) => {
    //   observer.next(1);
    //   observer.next(2);
    //   observer.next(3);
    //   setTimeout(() => {
    //     observer.next(4);
    //     observer.complete();
    //   }, 2000)
    // })
    // console.log('just before subscribe');
    // observable.subscribe({
    //   next: x => console.log('got value ' + x),
    //   error: err => console.error('something wrong occurred: ' + err),
    //   complete: () => console.log('done')
    // })
    // observable.subscribe({
    //   next: x => console.log('got value2 ' + x),
    //   error: err => console.error('something wrong occurred2: ' + err),
    //   complete: () => console.log('done2')
    // })
    // console.log('just after subscribe');

    // let observable1 = Observable.interval(500);
    // let observable2 = Observable.interval(400);

    // let subscription = observable1.subscribe((x) => console.log('first: ' + x));
    // let childSubscription = observable2.subscribe(x => console.log('secnd: ' + x));
    // // subscription.unsubscribe();
    // subscription.add(childSubscription);
    // setTimeout(() => {
    //   // Unsubscribes BOTH subscription and childSubscription
    //   subscription.unsubscribe();
    // }, 1000);

    // let subject = new Subject();
    // subject.subscribe({
    //   next: v => console.log('observerA: ' + v)
    // })
    // subject.subscribe({
    //   next: v => console.log('observerB: ' + v)
    // })
    // // subject.next(1);
    // // subject.next(2);
    // let obserable = Observable.from([1, 2, 3]);
    // obserable.subscribe(subject);
    let source = Observable.from([1, 2, 3, 4]);
    let subject = new Subject();
    let multicasted = source.multicast(subject);
    multicasted.subscribe({
      next: v => console.log('observerA: ' + v)
    })
    multicasted.subscribe({
      next: v => console.log('observerB: ' + v)
    })
    multicasted.connect();
  }
  render() {
    const { self, count } = this.state;
    return (
      <div ref='a' className={cx('box', 'slide-left')}>
        {self}
        <B />
        <input type="text" ref='ipt' />
        <button id="btn" ref='btn'>add</button><br/>
        {count}
      </div>
    );
  }
}


export default A;