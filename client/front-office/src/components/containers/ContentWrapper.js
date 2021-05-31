import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import tawkTo from 'tawkto-react';
import ContentHeader from './ContentHeader';
import Profile from '../profile/Profile';
import Budget from '../budget/Budget';
import Wallet from '../wallet/Wallet';
import EditForm from '../EditForm/EditForm';
import ChangePassword from '../ChangePassword/ChangePassword';
import Expense from '../movement/Expense';
import Transfer from '../movement/transfer/Transfer';
import Income from '../movement/income/Income';
import Invoices from '../shop/invoices/Invoices';
import Services from '../shop/services/Services';
import Orders from '../orders/Orders';
import Reports from '../reports/Reports';
import PdfPreview from '../pdfPreview/PdfPreview';
import Pro from '../Pro/Pro';
import Cart from '../cart/Cart';
import Dashboard from '../dashboard/Dashboard';
import FAQ from '../FAQ/faq';
import Contact from '../Contact/Contact';
import InvoiceId from '../InvoiceId/InvoiceId';
import Categories from '../Backoffice/categories/categories';
import OrdersBO from '../Backoffice/orders/Order';
import ServicesBO from '../Backoffice/services/services';

const ContentWrapper = () => {
  const history = useHistory();
  const loggedIn = useSelector((store) => store.authReducers.sessionData.loggedIn);
  const dispatch = useDispatch();
  const tawkToPropertyId = '578cd20d3daf03937c74defc';
  const tawkToKey = 'default';

  if (!loggedIn) {
    history.push('/login');
  }

  useEffect(() => {
    tawkTo(tawkToPropertyId, tawkToKey);
  }, [dispatch, history]);

  return loggedIn ? (
    <div className="content-wrapper">
      <section className="content">
        <div className="card">
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>

            <Route exact path="/pro">
              <Pro />
            </Route>

            <Route exact path="/profile">
              <Profile />
            </Route>

            <Route exact path="/edit">
              <EditForm />
            </Route>

            <Route exact path="/changePassword">
              <ChangePassword />
            </Route>

            <Route exact path="/wallet">
              <Wallet />
            </Route>

            <Route exact path="/budget">
              <Budget />
            </Route>

            <Route exact path="/income" component={Income} />
            <Route exact path="/expense" component={Expense} />
            <Route exact path="/transfer" component={Transfer} />

            <Route exact path="/reports">
              <Reports />
            </Route>

            <Route exact path="/invoices">
              <Invoices />
            </Route>

            <Route exact path="/services">
              <Services />
            </Route>

            <Route exact path="/orders">
              <Orders />
            </Route>

            <Route exact path="/preview">
              <PdfPreview />
            </Route>

            <Route exact path="/invoice/:idInvoice" component={InvoiceId} />

            <Route exact path="/cart">
              <Cart />
            </Route>

            <Route path="/FAQ">
              <div className="wrapper">
                <FAQ />
              </div>
            </Route>
            <Route path="/contact">
              <div className="wrapper">
                <Contact />
              </div>
            </Route>
            <Route exact path="/bo/categories">
              <Categories />
            </Route>
            <Route exact path="/bo/orders">
              <OrdersBO />
            </Route>
            <Route exact path="/bo/services">
              <ServicesBO />
            </Route>
            <ContentHeader />
          </Switch>
        </div>
      </section>
    </div>
  ) : (
    ''
  );
};

export default ContentWrapper;
