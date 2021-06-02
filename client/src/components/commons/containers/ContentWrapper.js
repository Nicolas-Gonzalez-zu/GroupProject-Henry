import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import tawkTo from 'tawkto-react';
import ContentHeader from './ContentHeader';
import Profile from '../profile/Profile';
import Budget from '../../frontoffice/budget/Budget';
import Wallet from '../../frontoffice/wallet/Wallet';
import EditForm from '../profile/EditForm';
import ChangePassword from '../../frontoffice/ChangePassword/ChangePassword';
import Expense from '../../frontoffice/movement/Expense';
import Transfer from '../../frontoffice/movement/transfer/Transfer';
import Income from '../../frontoffice/movement/income/Income';
import Invoices from '../../frontoffice/shop/invoices/Invoices';
import Services from '../../frontoffice/shop/services/Services';
import Orders from '../../frontoffice/orders/Orders';
import Reports from '../../frontoffice/reports/Reports';
import PdfPreview from '../../frontoffice/pdfPreview/PdfPreview';
import Pro from '../../frontoffice/Pro/Pro';
import Cart from '../../frontoffice/cart/Cart';
import Dashboard from '../../frontoffice/dashboard/Dashboard';
import FAQ from '../../frontoffice/FAQ/faq';
import Contact from '../../frontoffice/Contact/Contact';
import InvoiceId from '../../frontoffice/InvoiceId/InvoiceId';
import Categories from '../../Backoffice/categories/categories';
import OrdersBO from '../../Backoffice/orders/orders';
import ServicesBO from '../../Backoffice/services/services';
import DashboardBO from '../../Backoffice/dashboard/dashboard';

const ContentWrapper = () => {
  const dispatch = useDispatch();
  const tawkToPropertyId = '578cd20d3daf03937c74defc';
  const tawkToKey = 'default';

  useEffect(() => {
    tawkTo(tawkToPropertyId, tawkToKey);
  }, [dispatch]);

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="card">
          <Switch>
            <Route exact path="/client">
              <Dashboard />
            </Route>

            <Route exact path="/client/pro">
              <Pro />
            </Route>

            <Route exact path="/client/profile">
              <Profile />
            </Route>

            <Route exact path="/client/profile/edit">
              <EditForm />
            </Route>

            <Route exact path="/client/profile/changePassword">
              <ChangePassword adm={false} />
            </Route>

            <Route exact path="/client/wallet">
              <Wallet />
            </Route>

            <Route exact path="/client/budget">
              <Budget />
            </Route>

            <Route exact path="/client/income" component={Income} />
            <Route exact path="/client/expense" component={Expense} />
            <Route exact path="/client/transfer" component={Transfer} />

            <Route exact path="/client/reports">
              <Reports />
            </Route>

            <Route exact path="/client/invoices">
              <Invoices />
            </Route>

            <Route exact path="/client/services">
              <Services />
            </Route>

            <Route exact path="/client/orders">
              <Orders />
            </Route>

            <Route exact path="/client/preview">
              <PdfPreview />
            </Route>

            <Route exact path="/client/invoice/:idInvoice" component={InvoiceId} />

            <Route exact path="/client/cart">
              <Cart />
            </Route>

            <Route path="/client/FAQ">
              <div className="wrapper">
                <FAQ />
              </div>
            </Route>
            <Route path="/client/contact">
              <div className="wrapper">
                <Contact />
              </div>
            </Route>
            <Route exact path="/admin">
              <DashboardBO />
            </Route>
            <Route exact path="/admin/categories">
              <Categories />
            </Route>
            <Route exact path="/admin/orders">
              <OrdersBO />
            </Route>
            <Route exact path="/admin/services">
              <ServicesBO />
            </Route>
            <Route exact path="/admin/profile">
              <Profile />
            </Route>
            <Route exact path="/admin/profile/edit">
              <EditForm />
            </Route>
            <Route exact path="/admin/profile/changePassword">
              <ChangePassword adm />
            </Route>
            <ContentHeader />
          </Switch>
        </div>
      </section>
    </div>
  );
};

export default ContentWrapper;
