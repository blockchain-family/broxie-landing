import { useMemo } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion';
import { BsDashCircleFill, BsPlusCircleFill } from 'react-icons/bs';
import { FormattedMessage, useIntl } from 'react-intl';
import ExternalLink from 'components/core/external-link';
import { useStaticData } from 'providers/StaticDataProvider';

type FaqQuestion = {
  question: string;
  answer: JSX.Element;
};

const Faq = () => {
  const intl = useIntl();
  const staticData = useStaticData();

  const questions: FaqQuestion[] = useMemo(
    () => [
      {
        question: intl.formatMessage({
          id: 'landing.faq.question1',
          defaultMessage: 'What are Broxie NFTs?',
        }),
        answer: (
          <span>
            {intl.formatMessage({
              id: 'landing.faq.question1.answer',
              defaultMessage:
                'This is the first ever NFT collection created by Broxus, core developers of the Everscale blockchain. Never heard of NFT collections before? Man, it’s 2022, just google it.',
            })}
          </span>
        ),
      },
      {
        question: intl.formatMessage({
          id: 'landing.faq.question2',
          defaultMessage: 'What is Everscale? What is Broxus?',
        }),
        answer: (
          <span>
            <FormattedMessage
              id='landing.faq.question2.answer'
              defaultMessage={
                'The {everscale} blockchain is fast, scalable, and decentralized by design. The {broxus} team is one of the core contributors of the Everscale network and the creators of {octusBridge}, {flatQube}, {everWallet} and more.'
              }
              values={{
                everscale: (
                  <ExternalLink href={staticData.urls.everscale}>
                    Everscale
                  </ExternalLink>
                ),
                broxus: (
                  <ExternalLink href={staticData.urls.broxus}>
                    Broxus
                  </ExternalLink>
                ),
                octusBridge: (
                  <ExternalLink href={staticData.urls.octusBridge}>
                    Octus Bridge
                  </ExternalLink>
                ),
                flatQube: (
                  <ExternalLink href={staticData.urls.flatQube}>
                    FlatQube
                  </ExternalLink>
                ),
                everWallet: (
                  <ExternalLink href={staticData.urls.everWallet}>
                    EVER Wallet
                  </ExternalLink>
                ),
              }}
            />
          </span>
        ),
      },
      {
        question: intl.formatMessage({
          id: 'landing.faq.question3',
          defaultMessage: 'What’s so special about Broxies?',
        }),
        answer: (
          <span>
            {intl.formatMessage({
              id: 'landing.faq.question3.answer',
              defaultMessage:
                'So, first things first, it’s their utility that makes them desirable. You can read about that above. Secondly, since it’s the first collection ever, it’s an opportunity to become a part of Broxus and Everscale history. Thirdly, they just look good. Last but not least, we’ve got more surprises in store related to the collection.',
            })}
          </span>
        ),
      },
      {
        question: intl.formatMessage({
          id: 'landing.faq.question4',
          defaultMessage: 'How to purchase a Broxie NFT?',
        }),
        answer: (
          <span>
            <FormattedMessage
              id='landing.faq.question4.answer'
              defaultMessage={
                'Download the {everWallet} for the Everscale blockchain in order to buy and store NFTs. You can also use {metaMask} to purchase NFTs with funds from other blockchains. Then, wait until the “Purchase” button becomes avaialble. Click on it and purchase an NFT. That’s it! After the mint, your NFT will be avaialble in your EVER Wallet.'
              }
              values={{
                everWallet: (
                  <ExternalLink href={staticData.urls.everWallet}>
                    EVER Wallet
                  </ExternalLink>
                ),
                metaMask: (
                  <ExternalLink href={staticData.urls.metaMask}>
                    MetaMask
                  </ExternalLink>
                ),
              }}
            />
          </span>
        ),
      },
      {
        question: intl.formatMessage({
          id: 'landing.faq.question5',
          defaultMessage: 'When will the Broxie mint happen?',
        }),
        answer: (
          <span>
            {intl.formatMessage({
              id: 'landing.faq.question5.answer',
              defaultMessage: 'TBA',
            })}
          </span>
        ),
      },
      {
        question: intl.formatMessage({
          id: 'landing.faq.question6',
          defaultMessage:
            'Do you guys have any socials? I want to stay updated.',
        }),
        answer: (
          <span>
            {intl.formatMessage({
              id: 'landing.faq.question6.answer',
              defaultMessage:
                'Yes, you can find the links at the bottom of our website.',
            })}
          </span>
        ),
      },
    ],
    [intl, staticData.urls]
  );

  return (
    <div
      id='faq_section'
      className='space-y-8 sm:space-y-12 w-full mx-auto py-8'
    >
      <div className='text-center font-header text-4xl sm:text-6xl'>
        {intl.formatMessage({ id: 'landing.faq', defaultMessage: 'FAQ' })}
      </div>

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
