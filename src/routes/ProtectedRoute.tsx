
import { BackdropLoading, CirclePageLoading } from '@/components/Loading';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuth } from '../selectors/auth.selector';
import { Fragment } from 'react';
import NotificationSnackbar from '@/components/Custom/CustomSnackbar';
import NavbarHeader from '@/components/NavbarHeader';


const ProtectedRoute = () => {

	const { profile } = useSelector(getAuth);


	if (profile) {
		return (
			<Fragment>
				<div className='container'>
					<NavbarHeader />
					<div className="content">
						<div className="content-body">
							<Outlet />
						</div>
					</div>
				</div>
				<NotificationSnackbar />
				
			</Fragment>
		);
	}

	if (profile === undefined) {
		return <CirclePageLoading />;
	}

	return <Navigate to="/login" replace />;


};

export default ProtectedRoute;
