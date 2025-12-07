import { Link } from "react-router";

export default function Footer() {
    return (
        <div className="footer">
           <footer>
                <div>
                    <p>This site is designed to be used for training purposes. ReactJS course Copyright&copy 2025</p>
                    <p className="follow">Follow us:
                        <Link to="https://www.facebook.com/SoftUni" target="_blank"><i className="fab fa-facebook"></i></Link>
                        <Link to="https://twitter.com/softuni" target="_blank"><i className="fab fa-twitter"></i></Link>
                        <Link to="https://www.instagram.com/softuni/" target="_blank"><i className="fab fa-instagram"></i></Link>
                        <Link to="https://www.youtube.com/user/SoftUniBG" target="_blank"><i className="fab fa-youtube"></i></Link>
                    </p> 
                </div>
            </footer>
        </div>
    );
}