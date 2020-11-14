import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const StyledList = styled(List)`
  list-style: disc;
  margin-left: 40px;
`;

const StyledListItem = styled(ListItem)`
  display: list-item;
`;

function TermsAndConditions() {
  return (
    <Container maxWidth="md" style={ { paddingTop: "8px", paddingBottom: "8px" } }>
      <Link href="/" passHref>
        <Button variant="contained">Home</Button>
      </Link>

      <div style={ { height: "16px" } } />

      <Typography component="h1" variant="h3" align="center" gutterBottom id="top">
        <strong>Terms and Conditions</strong>
      </Typography>

      <Typography>Welcome to Meal Planner!</Typography>

      <Typography paragraph>
        These terms and conditions outline the rules and regulations for the use of Meal Planner&apos;s Website, located
        at{" "}
        <Link href="/" passHref>
          <MuiLink>https://meal-planner-five.vercel.app/</MuiLink>
        </Link>
        .
      </Typography>

      <Typography paragraph>
        By accessing this website we assume you accept these terms and conditions. Do not continue to use Meal Planner
        if you do not agree to take all of the terms and conditions stated on this page.
      </Typography>

      <Typography paragraph>
        The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all
        Agreements: &quot;Client&quot;, &quot;You&quot; and &quot;Your&quot; refers to you, the person log on this
        website and compliant to the Company’s terms and conditions. &quot;The Company&quot;, &quot;Ourselves&quot;,
        &quot;We&quot;, &quot;Our&quot; and &quot;Us&quot;, refers to our Company. &quot;Party&quot;,
        &quot;Parties&quot;, or &quot;Us&quot;, refers to both the Client and ourselves. All terms refer to the offer,
        acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in
        the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the
        Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the
        above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as
        interchangeable and therefore as referring to same.
      </Typography>

      <Typography component="h2" variant="h5" id="Cookies" gutterBottom>
        <strong>Cookies</strong>
      </Typography>

      <Typography paragraph>
        We employ the use of cookies. By accessing Meal Planner, you agreed to use cookies in agreement with the Meal
        Planner&apos;s Privacy Policy.{" "}
      </Typography>

      <Typography paragraph>
        Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by
        our website to enable the functionality of certain areas to make it easier for people visiting our website. Some
        of our affiliate/advertising partners may also use cookies.
      </Typography>

      <Typography component="h2" variant="h5" id="Cookies" gutterBottom>
        <strong>License</strong>
      </Typography>

      <Typography paragraph>
        Unless otherwise stated, Meal Planner and/or its licensors own the intellectual property rights for all material
        on Meal Planner. All intellectual property rights are reserved. You may access this from Meal Planner for your
        own personal use subjected to restrictions set in these terms and conditions.
      </Typography>

      <Typography>You must not:</Typography>
      <StyledList>
        <StyledListItem>Republish material from Meal Planner</StyledListItem>
        <StyledListItem>Sell, rent or sub-license material from Meal Planner</StyledListItem>
        <StyledListItem>Reproduce, duplicate or copy material from Meal Planner</StyledListItem>
        <StyledListItem>Redistribute content from Meal Planner</StyledListItem>
      </StyledList>

      <Typography paragraph>
        This Agreement shall begin on the date hereof. Our Terms and Conditions were created with the help of the{" "}
        <MuiLink href="https://www.termsandconditionsgenerator.com" taget="_blank" rel="noopener noreferrer">
          Terms And Conditions Generator
        </MuiLink>{" "}
        and the{" "}
        <MuiLink href="https://privacyterms.io/privacy-policy-generator/" taget="_blank" rel="noopener noreferrer">
          Privacy Policy Generator
        </MuiLink>
        .
      </Typography>

      <Typography paragraph>
        Parts of this website offer an opportunity for users to post and exchange opinions and information in certain
        areas of the website. Meal Planner does not filter, edit, publish or review Comments prior to their presence on
        the website. Comments do not reflect the views and opinions of Meal Planner,its agents and/or affiliates.
        Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted
        by applicable laws, Meal Planner shall not be liable for the Comments or for any liability, damages or expenses
        caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this
        website.
      </Typography>

      <Typography paragraph>
        Meal Planner reserves the right to monitor all Comments and to remove any Comments which can be considered
        inappropriate, offensive or causes breach of these Terms and Conditions.
      </Typography>

      <Typography>You warrant and represent that:</Typography>

      <StyledList>
        <StyledListItem>
          You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;
        </StyledListItem>
        <StyledListItem>
          The Comments do not invade any intellectual property right, including without limitation copyright, patent or
          trademark of any third party;
        </StyledListItem>
        <StyledListItem>
          The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which
          is an invasion of privacy
        </StyledListItem>
        <StyledListItem>
          The Comments will not be used to solicit or promote business or custom or present commercial activities or
          unlawful activity.
        </StyledListItem>
      </StyledList>

      <Typography paragraph>
        You hereby grant Meal Planner a non-exclusive license to use, reproduce, edit and authorize others to use,
        reproduce and edit any of your Comments in any and all forms, formats or media.
      </Typography>

      <Typography component="h2" variant="h5" id="Cookies" gutterBottom>
        <strong>Hyperlinking to our Content</strong>
      </Typography>

      <Typography paragraph>
        The following organizations may link to our Website without prior written approval:
      </Typography>

      <StyledList>
        <StyledListItem>Government agencies;</StyledListItem>
        <StyledListItem>Search engines;</StyledListItem>
        <StyledListItem>News organizations;</StyledListItem>
        <StyledListItem>
          Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of
          other listed businesses; and
        </StyledListItem>
        <StyledListItem>
          System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and
          charity fundraising groups which may not hyperlink to our Web site.
        </StyledListItem>
      </StyledList>

      <Typography paragraph>
        These organizations may link to our home page, to publications or to other Website information so long as the
        link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the
        linking party and its products and/or services; and (c) fits within the context of the linking party’s site.
      </Typography>

      <Typography>
        We may consider and approve other link requests from the following types of organizations:
      </Typography>

      <StyledList>
        <StyledListItem>commonly-known consumer and/or business information sources;</StyledListItem>
        <StyledListItem>dot.com community sites;</StyledListItem>
        <StyledListItem>associations or other groups representing charities;</StyledListItem>
        <StyledListItem>online directory distributors;</StyledListItem>
        <StyledListItem>internet portals;</StyledListItem>
        <StyledListItem>accounting, law and consulting firms; and</StyledListItem>
        <StyledListItem>educational institutions and trade associations.</StyledListItem>
      </StyledList>

      <Typography paragraph>
        We will approve link requests from these organizations if we decide that: (a) the link would not make us look
        unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative
        records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Meal
        Planner; and (d) the link is in the context of general resource information.
      </Typography>

      <Typography paragraph>
        These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not
        falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c)
        fits within the context of the linking party’s site.
      </Typography>

      <Typography paragraph>
        If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website,
        you must inform us by sending an e-mail to Meal Planner. Please include your name, your organization name,
        contact information as well as the URL of your site, a list of any URLs from which you intend to link to our
        Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.
      </Typography>

      <Typography>Approved organizations may hyperlink to our Website as follows:</Typography>

      <StyledList>
        <StyledListItem>By use of our corporate name; or</StyledListItem>
        <StyledListItem>By use of the uniform resource locator being linked to; or</StyledListItem>
        <StyledListItem>
          By use of any other description of our Website being linked to that makes sense within the context and format
          of content on the linking party’s site.
        </StyledListItem>
      </StyledList>

      <Typography paragraph>
        No use of Meal Planner&apos;s logo or other artwork will be allowed for linking absent a trademark license
        agreement.
      </Typography>

      <Typography component="h2" variant="h5" id="Cookies" gutterBottom>
        <strong>iFrames</strong>
      </Typography>

      <Typography paragraph>
        Without prior approval and written permission, you may not create frames around our Webpages that alter in any
        way the visual presentation or appearance of our Website.
      </Typography>

      <Typography component="h2" variant="h5" id="Cookies" gutterBottom>
        <strong>Content Liability</strong>
      </Typography>

      <Typography paragraph>
        We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend
        us against all claims that is rising on your Website. No link(s) should appear on any Website that may be
        interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the
        infringement or other violation of, any third party rights.
      </Typography>

      <Typography component="h2" variant="h5" id="Cookies" gutterBottom>
        <strong>Your Privacy</strong>
      </Typography>

      <Typography gutterBottom>
        Please read{" "}
        <Link href="/privacy-policy" passHref>
          <MuiLink>Privacy Policy</MuiLink>
        </Link>
      </Typography>

      <Typography component="h2" variant="h5" id="Cookies" gutterBottom>
        <strong>Reservation of Rights</strong>
      </Typography>

      <Typography paragraph>
        We reserve the right to request that you remove all links or any particular link to our Website. You approve to
        immediately remove all links to our Website upon request. We also reserve the right to amen these terms and
        conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to
        and follow these linking terms and conditions.
      </Typography>

      <Typography component="h2" variant="h5" id="Cookies" gutterBottom>
        <strong>Removal of links from our website</strong>
      </Typography>

      <Typography paragraph>
        If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any
        moment. We will consider requests to remove links but we are not obligated to or so or to respond to you
        directly.
      </Typography>

      <Typography paragraph>
        We do not ensure that the information on this website is correct, we do not warrant its completeness or
        accuracy; nor do we promise to ensure that the website remains available or that the material on the website is
        kept up to date.
      </Typography>

      <Typography component="h2" variant="h5" id="Cookies" gutterBottom>
        <strong>Disclaimer</strong>
      </Typography>

      <Typography>
        To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions
        relating to our website and the use of this website. Nothing in this disclaimer will:
      </Typography>

      <StyledList>
        <StyledListItem>limit or exclude our or your liability for death or personal injury;</StyledListItem>
        <StyledListItem>
          limit or exclude our or your liability for fraud or fraudulent misrepresentation;
        </StyledListItem>
        <StyledListItem>
          limit any of our or your liabilities in any way that is not permitted under applicable law; or
        </StyledListItem>
        <StyledListItem>
          exclude any of our or your liabilities that may not be excluded under applicable law.
        </StyledListItem>
      </StyledList>

      <Typography paragraph>
        The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are
        subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including
        liabilities arising in contract, in tort and for breach of statutory duty.
      </Typography>

      <Typography paragraph>
        As long as the website and the information and services on the website are provided free of charge, we will not
        be liable for any loss or damage of any nature.
      </Typography>

      <Typography align="right" display="block" gutterBottom>
        <MuiLink href="#top">Back to top</MuiLink>
      </Typography>
    </Container>
  );
}

export default TermsAndConditions;
