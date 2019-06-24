import React from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends React.Component {

    render() {
        return (
            <div className={'Content FlexCenter'}>
                <h1>Aplikace eKazuistiky</h1>

                <Link to={'/student'} className={'Button'}>Student</Link>
                <br></br>
                <Link to={'/teacher'} className={'Button'}>Učitel</Link>
            </div>
        );
    }
}

export default LandingPage;