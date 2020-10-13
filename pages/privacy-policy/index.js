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
  list-style: decimal;
  margin-left: ${({ theme }) => theme.spacing(5)}px;
`;

const StyledListItem = styled(ListItem)`
  display: list-item;
`;

function PrivacyPolicy() {
  return (
    <Container maxWidth="md">
      <Link href="/" passHref>
        <Button variant="contained">Home</Button>
      </Link>

      <Typography component="h1" variant="h3" align="center" gutterBottom>
        Privacy Policy
      </Typography>

      <Typography gutterBottom>
        <strong>Effective Date: 13-10-2020</strong>
      </Typography>
      <Typography component="h3" variant="h5" gutterBottom>
        Your privacy is important to us
      </Typography>

      <Typography paragraph>
        It is Meal Planner&apos;s policy to respect your privacy regarding any information we may collect while
        operating our website. This Privacy Policy applies to{" "}
        <Link href="/">
          <MuiLink>meal-planner-five.vercel.app</MuiLink>
        </Link>{" "}
        (hereinafter, &quot;us&quot;, &quot;we&quot;, or &quot;meal-planner-five.vercel.app/&quot;). We respect your
        privacy and are committed to protecting personally identifiable information you may provide us through the
        Website. We have adopted this privacy policy (&quot;Privacy Policy&quot;) to explain what information may be
        collected on our Website, how we use this information, and under what circumstances we may disclose the
        information to third parties. This Privacy Policy applies only to information we collect through the Website and
        does not apply to our collection of information from other sources.
      </Typography>
      <Typography paragraph>
        This Privacy Policy, together with the Terms of service posted on our Website, set forth the general rules and
        policies governing your use of our Website. Depending on your activities when visiting our Website, you may be
        required to agree to additional terms of service.
      </Typography>
      <Typography component="h2" variant="h5" id="tableofcontents" gutterBottom>
        Contents
      </Typography>
      <Typography gutterBottom>Click below to jump to any section of this privacy policy</Typography>
      <StyledList component="ol" type="1">
        <StyledListItem>
          <MuiLink href="#PII">
            <strong>Personally-Identifying Information</strong>
          </MuiLink>
        </StyledListItem>
        <StyledListItem>
          <MuiLink href="#Security">
            <strong>Security</strong>
          </MuiLink>
        </StyledListItem>
        <StyledListItem>
          <MuiLink href="#ExternalLinks">
            <strong>Links To External Sites</strong>
          </MuiLink>
        </StyledListItem>
        <StyledListItem>
          <MuiLink href="#PIIProtection">
            <strong>Protection of Certain Personally-Identifying Information</strong>
          </MuiLink>
        </StyledListItem>
        <StyledListItem>
          <MuiLink href="#Cookies">
            <strong>Cookies</strong>
          </MuiLink>
        </StyledListItem>
        <StyledListItem>
          <MuiLink href="#businesstransfers">
            <strong>Business Transfers</strong>
          </MuiLink>
        </StyledListItem>
        <StyledListItem>
          <MuiLink href="#Changes">
            <strong>Privacy Policy Changes</strong>
          </MuiLink>
        </StyledListItem>
        <StyledListItem>
          <MuiLink href="#Credit">
            <strong>Contact Information &amp; Credit</strong>
          </MuiLink>
        </StyledListItem>
      </StyledList>
      <Typography component="h2" variant="h5" id="PII" gutterBottom>
        1. Personally-Identifying Information
      </Typography>
      <Typography paragraph>
        Certain visitors to Meal Planner&apos;s websites choose to interact with Meal Planner in ways that require Meal
        Planner to gather personally-identifying information. The amount and type of information that Meal Planner
        gathers depends on the nature of the interaction. For example, we ask visitors who leave a comment at
        https://meal-planner-five.vercel.app/ to provide a username and email address.
      </Typography>

      <Typography align="right" display="block" gutterBottom>
        <MuiLink href="#tableofcontents">Back to table of contents</MuiLink>
      </Typography>
      <Typography component="h2" variant="h5" id="Security" gutterBottom>
        2. Security
      </Typography>
      <Typography paragraph>
        The security of your Personal Information is important to us, but remember that no method of transmission over
        the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable
        means to protect your Personal Information, we cannot guarantee its absolute security.
      </Typography>

      <Typography align="right" display="block" gutterBottom>
        <MuiLink href="#tableofcontents">Back to table of contents</MuiLink>
      </Typography>
      <Typography component="h2" variant="h5" id="ExternalLinks" gutterBottom>
        3. Links To External Sites
      </Typography>
      <Typography paragraph>
        OurTypography paragraph Service may contain links to external sites that are not operated by us. If you click on
        a third party link, you will be directed to that third party&apos;s site. We strongly advise you to review the
        Privacy Policy and terms of service of every site you visit.
      </Typography>
      <Typography paragraph>
        We have no control over, and assume no responsibility for the content, privacy policies or practices of any
        third party sites, products or services.
      </Typography>

      <Typography align="right" display="block" gutterBottom>
        <MuiLink href="#tableofcontents">Back to table of contents</MuiLink>
      </Typography>
      <Typography component="h2" variant="h5" id="PIIProtection" gutterBottom>
        4. Protection of Certain Personally-Identifying Information
      </Typography>
      <Typography paragraph>
        Meal Planner discloses potentially personally-identifying and personally-identifying information only to those
        of its employees, contractors and affiliated organizations that (i) need to know that information in order to
        process it on Meal Planner&apos;s behalf or to provide services available at Meal Planner&apos;s website, and
        (ii) that have agreed not to disclose it to others. Some of those employees, contractors and affiliated
        organizations may be located outside of your home country; by using Meal Planner&apos;s website, you consent to
        the transfer of such information to them. Meal Planner will not rent or sell potentially personally-identifying
        and personally-identifying information to anyone. Other than to its employees, contractors and affiliated
        organizations, as described above, Meal Planner discloses potentially personally-identifying and
        personally-identifying information only in response to a subpoena, court order or other governmental request, or
        when Meal Planner believes in good faith that disclosure is reasonably necessary to protect the property or
        rights of Meal Planner, third parties or the public at large.
      </Typography>
      <Typography paragraph>
        If you are a registered user of https://meal-planner-five.vercel.app/ and have supplied your email address, Meal
        Planner may occasionally send you an email to tell you about new features, solicit your feedback, or just keep
        you up to date with what&apos;s going on with Meal Planner and our products. We primarily use our blog to
        communicate this type of information, so we expect to keep this type of email to a minimum. If you send us a
        request (for example via a support email or via one of our feedback mechanisms), we reserve the right to publish
        it in order to help us clarify or respond to your request or to help us support other users. Meal Planner takes
        all measures reasonably necessary to protect against the unauthorized access, use, alteration or destruction of
        potentially personally-identifying and personally-identifying information.
      </Typography>

      <Typography align="right" display="block" gutterBottom>
        <MuiLink href="#tableofcontents">Back to table of contents</MuiLink>
      </Typography>
      <Typography component="h2" variant="h5" id="Cookies" gutterBottom>
        5. Cookies
      </Typography>
      <Typography paragraph>
        To enrich and perfect your online experience, Meal Planner uses &quot;Cookies&quot;, similar technologies and
        services provided by others to display personalized content, appropriate advertising and store your preferences
        on your computer.
      </Typography>
      <Typography paragraph>
        A cookie is a string of information that a website stores on a visitor&apos;s computer, and that the
        visitor&apos;s browser provides to the website each time the visitor returns. Meal Planner uses cookies to help
        Meal Planner identify and track visitors, their usage of https://meal-planner-five.vercel.app/, and their
        website access preferences. Meal Planner visitors who do not wish to have cookies placed on their computers
        should set their browsers to refuse cookies before using Meal Planner&apos;s websites, with the drawback that
        certain features of Meal Planner&apos;s websites may not function properly without the aid of cookies.
      </Typography>
      <Typography paragraph>
        By continuing to navigate our website without changing your cookie settings, you hereby acknowledge and agree to
        Meal Planner&apos;s use of cookies.
      </Typography>

      <Typography align="right" display="block" gutterBottom>
        <MuiLink href="#tableofcontents">Back to table of contents</MuiLink>
      </Typography>
      <Typography component="h2" variant="h5" id="businesstransfers" gutterBottom>
        6. Business Transfers
      </Typography>
      <Typography paragraph>
        If Meal Planner, or substantially all of its assets, were acquired, or in the unlikely event that Meal Planner
        goes out of business or enters bankruptcy, user information would be one of the assets that is transferred or
        acquired by a third party. You acknowledge that such transfers may occur, and that any acquirer of Meal Planner
        may continue to use your personal information as set forth in this policy.
      </Typography>

      <Typography align="right" display="block" gutterBottom>
        <MuiLink href="#tableofcontents">Back to table of contents</MuiLink>
      </Typography>
      <Typography component="h2" variant="h5" id="Changes" gutterBottom>
        7. Privacy Policy Changes
      </Typography>
      <Typography paragraph>
        Although most changes are likely to be minor, Meal Planner may change its Privacy Policy from time to time, and
        in Meal Planner&apos;s sole discretion. Meal Planner encourages visitors to frequently check this page for any
        changes to its Privacy Policy. Your continued use of this site after any change in this Privacy Policy will
        constitute your acceptance of such change.
      </Typography>

      <Typography align="right" display="block" gutterBottom>
        <MuiLink href="#tableofcontents">Back to table of contents</MuiLink>
      </Typography>
      <Typography component="h2" variant="h5" id="Credit" gutterBottom>
        8. Contact Information &amp; Credit
      </Typography>
      <Typography paragraph>
        This privacy policy was created at{" "}
        <MuiLink
          href="https://privacyterms.io/privacy-policy-generator/"
          title="Privacy policy generator"
          target="_blank"
          rel="noopener noreferrer"
        >
          privacyterms.io privacy policy generator
        </MuiLink>
        . If you have any questions about our Privacy Policy, please contact us via{" "}
        <MuiLink href="mailto:jasonacido@gmail.com">email</MuiLink>.
      </Typography>

      <Typography align="right" display="block" gutterBottom>
        <MuiLink href="#tableofcontents">Back to table of contents</MuiLink>
      </Typography>

      <Typography align="right" display="block" gutterBottom>
        <MuiLink href="#top">Back to top</MuiLink>
      </Typography>
    </Container>
  );
}

export default PrivacyPolicy;
