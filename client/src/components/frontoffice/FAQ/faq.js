import React, { useState, useEffect } from 'react';
import existentQuestions from './questions';
// function handleQuestion(e) {
//   for (let i = 0; i < target.length; i++) {
//     document.getElementsByName(`${target[i]}`);
//   }
// }

const FAQ = () => {
  const [target, setTarget] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [foundQuestions, setfoundQuestions] = useState(existentQuestions);

  const keywords = [
    'download',
    'report',
    'change',
    'profile',
    'password',
    'services',
    'accountant',
    'hire',
    'pro',
    'plan',
    'receipts',
    'message',
    'expends',
    'create',
    'money',
    'transfer',
    'virtual',
    'wallet',
    'doubt',
    'secure',
    'forgot',
    'buy',
    'security',
  ];

  const [search, setSearch] = useState({
    typingTimeout: 0,
    value: '',
  });

  const handleSearch = (value) => {
    if (search.typingTimeout) {
      clearTimeout(search.typingTimeout);
    }
    setSearch({
      ...search,
      typingTimeout: window.setTimeout(() => {
        setSearch({
          ...search,
          value,
        });
      }, 2000),
    });
  };

  const questionFound = (questionKeywords) =>
    existentQuestions.filter((question) =>
      questionKeywords.some((questionKeyword) => question.keywords.includes(questionKeyword)),
    );

  useEffect(() => {
    if (filtered?.length) setfoundQuestions(questionFound(filtered));
    else setfoundQuestions(existentQuestions);
  }, [filtered]);

  const findKeywords = ({ value }) => {
    const newFiltered = [];
    setfoundQuestions(existentQuestions);
    if (value !== '') {
      keywords.forEach((keyword) => {
        if (value.includes(keyword)) newFiltered.push(keyword);
      });
      setFiltered(newFiltered);
    }
  };

  useEffect(() => {
    findKeywords(search);
  }, [search.value]);

  function onChange(e) {
    setTarget(e.target.value);
    handleSearch(e.target.value);
  }

  return (
    <div className="col-12" id="accordion">
      <div>
        <div className="input-group p-5">
          <input
            type="search"
            className="form-control form-control-lg"
            placeholder="Ask me"
            value={target}
            onChange={onChange}
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-lg btn-default">
              <i className="fa fa-search" />
            </button>
          </div>
        </div>
      </div>

      {foundQuestions?.map(({ question, answer, id }, index) => (
        <div key={id} className="card card-primary card-outline">
          <a className="d-block w-100" data-toggle="collapse" href={`#collapse-${id}`}>
            <div className="card-header">
              <h4 className="card-title w-100" name="download report">
                {question}
              </h4>
            </div>
          </a>
          <div id={`collapse-${id}`} className="collapse show" data-parent="#accordion">
            <div className="card-body">{answer}</div>
          </div>
        </div>
      ))}
      {/* 
      <div className="card card-primary card-outline">
        <a className="d-block w-100" data-toggle="collapse" href="#collapse-2">
          <div className="card-header">
            <h4 className="card-title w-100" name="profile">
              2. How can I change my profile information?
            </h4>
          </div>
        </a>
        <div id="collapse-2" className="collapse" data-parent="#accordion">
          <div className="card-body">
            First you will have to go to the Profile section on the sidebar and then you will have
            to click on Change Info. That will lead you to a form so you can change your Email
            address, Phone or Avatar photo.
          </div>
        </div>
      </div>
      <div className="card card-primary card-outline">
        <a className="d-block w-100" data-toggle="collapse" href="#collapse-3">
          <div className="card-header">
            <h4 className="card-title w-100" name="password forgot">
              3. How can I change my Password if I forgot it?
            </h4>
          </div>
        </a>
        <div id="collapse-3" className="collapse" data-parent="#accordion">
          <div className="card-body">
            First you will have to go to the Profile section and then click on the Change Password
            button, that will lead you to a form. You have to click on the Forgot Password? link.
            You can recover your password by writing the same email address that you Sign up with.
            We will send you a code so you can change the password. Even if you Signed up with a
            Facebook or Google account you can change the password following the same steps.
          </div>
        </div>
      </div>
      <div className="card card-warning card-outline">
        <a className="d-block w-100" data-toggle="collapse" href="#collapse-4">
          <div className="card-header">
            <h4 className="card-title w-100" name="buy services accountant hire">
              4. Can I buy services from an accountant?
            </h4>
          </div>
        </a>
        <div id="collapse-4" className="collapse" data-parent="#accordion">
          <div className="card-body">
            Yes, you can hire an specialist to help you manage your finances. To do that you will
            have to go to the Shop section and then to the Services section. When you get there you
            can choose the Accountant that fits you the most by clicking on the Add to cart button.
            When you are done you can go to the Cart and choose between Paypal or Mercadopago to
            pay. Enter your card information and when the payment is successful you will have an
            open chat with the Accountant on the Orders section.
          </div>
        </div>
      </div>
      <div className="card card-warning card-outline">
        <a className="d-block w-100" data-toggle="collapse" href="#collapse-5">
          <div className="card-header">
            <h4 className="card-title w-100" name="pro plan">
              5. What are the benefits of getting a Pro Plan and how can I get it?
            </h4>
          </div>
        </a>
        <div id="collapse-5" className="collapse" data-parent="#accordion">
          <div className="card-body">
            With the Pro Plan you can download all the movements that you want. Also the Services
            you get will act faster than the ones if you have a Free Plan. You can get a Pro Plan by
            going to the Account Pro section and clicking on the Buy Now button. Then you will have
            to go to the Cart and Pay for the Plan that you have chosen.
          </div>
        </div>
      </div>
      <div className="card card-warning card-outline">
        <a className="d-block w-100" data-toggle="collapse" href="#collapse-6">
          <div className="card-header">
            <h4 className="card-title w-100" name="receipts">
              6. How can I see my receipts?
            </h4>
          </div>
        </a>
        <div id="collapse-6" className="collapse" data-parent="#accordion">
          <div className="card-body">
            To see your receipts you will have to go to the Shop section on the sidebar and then to
            the Invoices section. You can download the receipts on a PDF file by clicking the
            Download button.
          </div>
        </div>
      </div>
      <div className="card card-danger card-outline">
        <a className="d-block w-100" data-toggle="collapse" href="#collapse-7">
          <div className="card-header">
            <h4 className="card-title w-100" name="message hire">
              7. How can I message the Accountant that I hired?
            </h4>
          </div>
        </a>
        <div id="collapse-7" className="collapse" data-parent="#accordion">
          <div className="card-body">
            On the Orders section you will have all the chats with the Services that you hired.
            Remember that you cant send personal information.
          </div>
        </div>
      </div>
      <div className="card card-danger card-outline">
        <a className="d-block w-100" data-toggle="collapse" href="#collapse-8">
          <div className="card-header">
            <h4 className="card-title w-100" name="expend create">
              8. What do I need to create an expense?
            </h4>
          </div>
        </a>
        <div id="collapse-8" className="collapse" data-parent="#accordion">
          <div className="card-body">
            First you will have to create a Wallet on the Wallet section. Then you will have to
            create a Budget so you can know where are you taking the money from. Go to the Movements
            section on the sidebar an click on the Expenses tab. Create an Expense by clicking the
            button Create, that will lead you to a form where you will have to specify the details
            (Amount, Description, Wallet, Budget). On the Wallet section you will see the movements
            that you made.
          </div>
        </div>
      </div>
      <div className="card card-danger card-outline">
        <a className="d-block w-100" data-toggle="collapse" href="#collapse-9">
          <div className="card-header">
            <h4 className="card-title w-100" name="transfer money">
              9. Can I transfer money between accounts?
            </h4>
          </div>
        </a>
        <div id="collapse-9" className="collapse" data-parent="#accordion">
          <div className="card-body">
            Yes, you have to go to the Transfers tab on the Movements section and choose the wallet
            that you want to take the money from and the one that will receive the transfer. Then
            you can add a Date for the transfer. You will see the movements of your wallets on the
            Wallet section.
          </div>
        </div>
      </div>
      <div className="card card-danger card-outline">
        <a className="d-block w-100" data-toggle="collapse" href="#collapse-10">
          <div className="card-header">
            <h4 className="card-title w-100" name="virtual wallet">
              10. Can I add virtual wallets to my E-conomy account?
            </h4>
          </div>
        </a>
        <div id="collapse-10" className="collapse" data-parent="#accordion">
          <div className="card-body">
            Not yet, we are working on adding more features so you can have a better experience
            managing your finances.
          </div>
        </div>
      </div>
      <div className="card card-danger card-outline">
        <a className="d-block w-100" data-toggle="collapse" href="#collapse-11">
          <div className="card-header">
            <h4 className="card-title w-100" name="doubt">
              11. What can I do if I have a doubt and is not on the FAQ section?
            </h4>
          </div>
        </a>
        <div id="collapse-11" className="collapse" data-parent="#accordion">
          <div className="card-body">
            You can chat or send an email to a member of the team by opening the chat on the left
            side. Fill out the form and we will get back to you as soon as possible.
          </div>
        </div>
      </div>
      <div className="card card-danger card-outline">
        <a className="d-block w-100" data-toggle="collapse" href="#collapse-12">
          <div className="card-header">
            <h4 className="card-title w-100" name="secure security">
              12. How can I know that the website is secure?
            </h4>
          </div>
        </a>
        <div id="collapse-12" className="collapse" data-parent="#accordion">
          <div className="card-body">
            All the information in your account is Encrypted. Our first priority is that your data
            is safe. Checkout
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
      </div> */}
    </div>
  );
};

export default FAQ;

// 1 array con palabras clave
// 2 iterar (document.getelementbyid(`#collapse-${i}`)) include de string para ver si tiene alguno de los
// elementos del array
// sobre cada elemento dependiendo de su id
// lowercase
// report profile password services accountant pro
// receipts message expends create money transfer  virtual wallet doubt
// secure
