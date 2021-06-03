import React from 'react';

const FAQ = () => (
  <div className="col-12" id="accordion">
    <div>
      <div className="input-group p-5">
        <input type="search" className="form-control form-control-lg" placeholder="Ask me" />
        <div className="input-group-append">
          <button type="submit" className="btn btn-lg btn-default">
            <i className="fa fa-search" />
          </button>
        </div>
      </div>
    </div>
    <div className="card card-primary card-outline">
      <a className="d-block w-100" data-toggle="collapse" href="#collapseOne">
        <div className="card-header">
          <h4 className="card-title w-100">
            1. How can I download an annual report of my movements?
          </h4>
        </div>
      </a>
      <div id="collapseOne" className="collapse show" data-parent="#accordion">
        <div className="card-body">
          First you will have to get a Pro Plan on the Account Pro section. Then you have to go to
          the Reports section on the Sidebar and click on the Download all movements button. You can
          filter the movements if you want to download an specific movement.
        </div>
      </div>
    </div>
    <div className="card card-primary card-outline">
      <a className="d-block w-100" data-toggle="collapse" href="#collapseTwo">
        <div className="card-header">
          <h4 className="card-title w-100">2. How can I change my profile information?</h4>
        </div>
      </a>
      <div id="collapseTwo" className="collapse" data-parent="#accordion">
        <div className="card-body">
          First you will have to go to the Profile section on the sidebar and then you will have to
          click on Change Info. That will lead you to a form so you can change your Email address,
          Phone or Avatar photo.
        </div>
      </div>
    </div>
    <div className="card card-primary card-outline">
      <a className="d-block w-100" data-toggle="collapse" href="#collapseThree">
        <div className="card-header">
          <h4 className="card-title w-100">3. How can I change my Password if I forgot it?</h4>
        </div>
      </a>
      <div id="collapseThree" className="collapse" data-parent="#accordion">
        <div className="card-body">
          First you will have to go to the Profile section and then click on the Change Password
          button, that will lead you to a form. You have to click on the Forgot Password? link. You
          can recover your password by writing the same email address that you Sign up with. We will
          send you a code so you can change the password. Even if you Signed up with a Facebook or
          Google account you can change the password following the same steps.
        </div>
      </div>
    </div>
    <div className="card card-warning card-outline">
      <a className="d-block w-100" data-toggle="collapse" href="#collapseFour">
        <div className="card-header">
          <h4 className="card-title w-100">4. Can I buy services from an accountant?</h4>
        </div>
      </a>
      <div id="collapseFour" className="collapse" data-parent="#accordion">
        <div className="card-body">
          Yes, you can hire an specialist to help you manage your finances. To do that you will have
          to go to the Shop section and then to the Services section. When you get there you can
          choose the Accountant that fits you the most by clicking on the Add to cart button. When
          you are done you can go to the Cart and choose between Paypal or Mercadopago to pay. Enter
          your card information and when the payment is successful you will have an open chat with
          the Accountant on the Orders section.
        </div>
      </div>
    </div>
    <div className="card card-warning card-outline">
      <a className="d-block w-100" data-toggle="collapse" href="#collapseFive">
        <div className="card-header">
          <h4 className="card-title w-100">
            5. What are the benefits of getting a Pro Plan and how can I get it?
          </h4>
        </div>
      </a>
      <div id="collapseFive" className="collapse" data-parent="#accordion">
        <div className="card-body">
          With the Pro Plan you can download all the movements that you want. Also the Services you
          get will act faster than the ones if you have a Free Plan. You can get a Pro Plan by going
          to the Account Pro section and clicking on the Buy Now button. Then you will have to go to
          the Cart and Pay for the Plan that you have chosen.
        </div>
      </div>
    </div>
    <div className="card card-warning card-outline">
      <a className="d-block w-100" data-toggle="collapse" href="#collapseSix">
        <div className="card-header">
          <h4 className="card-title w-100">6. How can I see my receipts?</h4>
        </div>
      </a>
      <div id="collapseSix" className="collapse" data-parent="#accordion">
        <div className="card-body">
          To see your receipts you will have to go to the Shop section on the sidebar and then to
          the Invoices section. You can download the receipts on a PDF file by clicking the Download
          button.
        </div>
      </div>
    </div>
    <div className="card card-danger card-outline">
      <a className="d-block w-100" data-toggle="collapse" href="#collapseSeven">
        <div className="card-header">
          <h4 className="card-title w-100">7. How can I message the Accountant that I hired?</h4>
        </div>
      </a>
      <div id="collapseSeven" className="collapse" data-parent="#accordion">
        <div className="card-body">
          On the Orders section you will have all the chats with the Services that you hired.
          Remember that you cant send personal information.
        </div>
      </div>
    </div>
    <div className="card card-danger card-outline">
      <a className="d-block w-100" data-toggle="collapse" href="#collapseEight">
        <div className="card-header">
          <h4 className="card-title w-100">8. What do I need to create an expense?</h4>
        </div>
      </a>
      <div id="collapseEight" className="collapse" data-parent="#accordion">
        <div className="card-body">
          First you will have to create a Wallet on the Wallet section. Then you will have to create
          a Budget so you can know where are you taking the money from. Go to the Movements section
          on the sidebar an click on the Expenses tab. Create an Expense by clicking the button
          Create, that will lead you to a form where you will have to specify the details (Amount,
          Description, Wallet, Budget). On the Wallet section you will see the movements that you
          made.
        </div>
      </div>
    </div>
    <div className="card card-danger card-outline">
      <a className="d-block w-100" data-toggle="collapse" href="#collapseNine">
        <div className="card-header">
          <h4 className="card-title w-100">9. Can I transfer money between accounts?</h4>
        </div>
      </a>
      <div id="collapseNine" className="collapse" data-parent="#accordion">
        <div className="card-body">
          Yes, you have to go to the Transfers tab on the Movements section and choose the wallet
          that you want to take the money from and the one that will receive the transfer. Then you
          can add a Date for the transfer. You will see the movements of your wallets on the Wallet
          section.
        </div>
      </div>
    </div>
    <div className="card card-danger card-outline">
      <a className="d-block w-100" data-toggle="collapse" href="#collapseNine">
        <div className="card-header">
          <h4 className="card-title w-100">
            10. Can I add virtual wallets to my E-conomy account?
          </h4>
        </div>
      </a>
      <div id="collapseNine" className="collapse" data-parent="#accordion">
        <div className="card-body">
          Not yet, we are working on adding more features so you can have a better experience
          managing your finances.
        </div>
      </div>
    </div>
    <div className="card card-danger card-outline">
      <a className="d-block w-100" data-toggle="collapse" href="#collapseNine">
        <div className="card-header">
          <h4 className="card-title w-100">
            11. What can I do if I have a doubt and is not on the FAQ section?
          </h4>
        </div>
      </a>
      <div id="collapseNine" className="collapse" data-parent="#accordion">
        <div className="card-body">
          You can chat or send an email to a member of the team by opening the chat on the left
          side. Fill out the form and we will get back to you as soon as possible.
        </div>
      </div>
    </div>
    <div className="card card-danger card-outline">
      <a className="d-block w-100" data-toggle="collapse" href="#collapseNine">
        <div className="card-header">
          <h4 className="card-title w-100">12. How can I know that the website is secure?</h4>
        </div>
      </a>
      <div id="collapseNine" className="collapse" data-parent="#accordion">
        <div className="card-body">
          All the information in your account is Encrypted. Our first priority is that your data is
          safe. Checkout
          <a
            style={{ color: 'blue' }}
            href="https://auth0.com/blog/hashing-in-action-understanding-bcrypt/"
          >
            {' '}
            this{' '}
          </a>
          article to know more about how we secure the information.
        </div>
      </div>
    </div>
  </div>
);

export default FAQ;
