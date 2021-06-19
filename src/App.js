import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

// import Posts from './containers/Posts';
import User from './containers/User';
import Welcome from './containers/Welcome';

// Loading 'Routes Lazily' =>::
// ==> I am only importing this path './containers/Posts' when this const 'AsyncPosts' is used somewhere
// =====> ALL This 'to not using Data when we are don't want it' <=====
/*** 'React.lazy()' => This method is ONLY available from 'react-16.6' ****/
const AsyncPosts = React.lazy(() => import('./containers/Posts'));

class App extends Component {
  state ={
    showPosts: false
  };
  modeHandler = () => {
    this.setState(prevState => {
      return { showPosts: !prevState.showPosts };
    });
  };

  render() {
    return (

      // 2 Differents Works that shows the Use of <Suspense /> in 2 differents examples
      // Comment 1 and Discomment the Other 1 AND vise versa to see the 2 examples

      // Example 1.
      <React.Fragment>
          <button onClick={this.modeHandler}>Toogle Mode</button>
          {this.state.showPosts ? (
            <Suspense fallback={<div>Loading...</div>} > 
              <AsyncPosts />
            </Suspense> 
        ) : (
          <User />
        )}
      </React.Fragment>

      // Example 2.
      // <BrowserRouter>
      //   <React.Fragment>
      //     <nav>
      //       <NavLink to="/user">User Page</NavLink> |&nbsp;
      //       <NavLink to="/posts">Posts Page</NavLink>
      //     </nav>
      //     <Route path="/" component={Welcome} exact />
      //     <Route path="/user" component={User} />

      //     {/* <Route path="/posts" component={Posts} /> */} {/* Replaced with the 'AsyncPosts' */}
      //     <Route path="/posts" render={() => ( 
      //       <Suspense fallback={<div>Loading...</div>} > 
      //         <AsyncPosts />
      //       </Suspense> 
      //     )}
      //      />
      //   </React.Fragment>
      // </BrowserRouter>
    );
  }
}

export default App;
