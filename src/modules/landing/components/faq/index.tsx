import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion';
import { BsDashCircleFill, BsPlusCircleFill } from 'react-icons/bs';

type FaqQuestion = {
  question: string;
  answer: JSX.Element;
};

const questions: FaqQuestion[] = [
  {
    question: 'What are Broxie NFTs?',
    answer: (
      <span>
        This is the first ever NFT collection created by Broxus, core developers
        of the Everscale blockchain. Never heard of NFT collections before? Man,
        it’s 2022, just google it.
      </span>
    ),
  },
  {
    question: 'What is Everscale? What is Broxus?',
    answer: (
      <span>
        The{' '}
        <a
          href='https://everscale.network'
          className='text-link'
          target='_blank'
          rel='noopener noreferrer'
        >
          Everscale
        </a>{' '}
        blockchain is fast, scalable, and decentralized by design. The{' '}
        <a
          href='https://broxus.com'
          className='text-link'
          target='_blank'
          rel='noopener noreferrer'
        >
          Broxus
        </a>{' '}
        team is one of the core contributors of the Everscale network and the
        creators of Octus Bridge, FlatQube, EVER Wallet and more.
      </span>
    ),
  },
  {
    question: 'What’s so special about Broxies?',
    answer: (
      <span>
        So, first things first, it’s their utility that makes them desirable.
        You can read about that above. Secondly, since it’s the first collection
        ever, it’s an opportunity to become a part of Broxus and Everscale
        history. Thirdly, they just look good. Last but not least, we’ve got
        more surprises in store related to the collection.
      </span>
    ),
  },
  {
    question: 'How to purchase a Broxie NFT?',
    answer: (
      <span>
        Download the{' '}
        <a
          href='https://l1.broxus.com/everscale/wallet'
          className='text-link'
          target='_blank'
          rel='noopener noreferrer'
        >
          EVER Wallet
        </a>{' '}
        for the Everscale blockchain in order to buy and store NFTs. You can
        also use{' '}
        <a
          href='https://metamask.io/download'
          className='text-link'
          target='_blank'
          rel='noopener noreferrer'
        >
          MetaMask
        </a>{' '}
        to purchase NFTs with funds from other blockchains. Then, wait until the
        “Purchase” button becomes available. Click on it and purchase an NFT.
        That’s it! After the mint, your NFT will be available in your EVER
        Wallet. After that wait for the mint, and, voilà.
      </span>
    ),
  },
  {
    question: 'When will the Broxie mint happen?',
    answer: <span>TBA</span>,
  },
  {
    question: 'Do you guys have any socials? I want to stay updated.',
    answer: (
      <span>Yes, you can find the links at the bottom of our website.</span>
    ),
  },
];

const Faq = () => {
  return (
    <div
      id='faq_section'
      className='space-y-8 sm:space-y-12 w-full mx-auto py-8'
    >
      <div className='text-center font-header text-4xl sm:text-6xl'>FAQ</div>

      <Accordion
        className='w-full space-y-6'
        allowMultipleExpanded
        allowZeroExpanded
      >
        {questions.map((x) => (
          <AccordionItem key={x.question} className='space-y-4 pb-1'>
            <AccordionItemHeading className='text-2xl font-bold'>
              <AccordionItemButton className='flex items-center space-x-2 sm:space-x-4'>
                <AccordionItemState>
                  {({ expanded }) => (
                    <span className='text-primary/40 mr-3 shrink-0'>
                      {expanded ? <BsDashCircleFill /> : <BsPlusCircleFill />}
                    </span>
                  )}
                </AccordionItemState>
                <span>{x.question}</span>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className='text-lg text-center'>
              {x.answer}
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
