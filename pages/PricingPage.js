import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const tiers = [
  {
    title: "Free Trial",
    price: "0",
    description: [
      "5 Questions",
      "ChatGPT 4",
      "Image Uploading",
      "Questions never expire",
    ],
    buttonText: "Your current plan",
    buttonVariant: "contained",
  },
  {
    title: "20 Credits",
    subheader: "Most popular",
    price: "0.99",
    description: [
      "20 Questions",
      "ChatGPT 4",
      "Image Uploading",
      "Questions never expire",
    ],
    buttonText: "Buy Now",
    buttonVariant: "contained",
  },
  {
    title: "Unlimited",
    price: "9.99",
    description: [
      "Unlimited Questions",
      "ChatGPT 4",
      "Image Uploading",
      "Chat History",
    ],
    frequency: "/mo",
    buttonText: "Subscribe Now",
    buttonVariant: "contained",
  },
];

const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"],
  },
  {
    title: "Features",
    description: [
      "Cool stuff",
      "Random feature",
      "Team feature",
      "Developer stuff",
      "Another one",
    ],
  },
  {
    title: "Resources",
    description: [
      "Resource",
      "Resource name",
      "Another resource",
      "Final resource",
    ],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
  },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Pricing() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
    
      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Pricing
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {tier?.frequency}
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      {/* End footer */}
    </ThemeProvider>
  );
}

// import { Nunito } from "@next/font/google";
// import React from "react";

// const nunito = Nunito({ subsets: ["latin"] });

// const PricingPage = ({ profileData }) => {
//   return (
//     <>
//       {/* <h4>
//           <a href='#refcode'>Have a referral code?</a>
//         </h4> */}
//       {/* <div
//           style={{
//             display: 'flex',
//             flexDirection: 'row',
//             flexWrap: 'wrap',
//             justifyContent: 'space-between',
//           }}
//         > */}
//       <div
//         style={{
//           margin: "16px auto",
//           width: "30%",
//           backgroundColor: "#f5f5f5",
//           borderRadius: 8,
//           minWidth: 200,
//           boxShadow: "5px 5px 10px gray",
//         }}
//       >
//         {/* <div style={{ padding: 8 }}>
//               <h3 className={nunito.className}>Free</h3>
//               <hr />
//               <h3 className={nunito.className}>Referral / 25 free credits</h3>
//               <hr />
//               <h4>Try for free</h4>
//               <p className={nunito.className}>
//                 Get 25 free credits per referral + 25 just for signing up!
//               </p>
//               <form action='/api/checkout_sessions?user_id=${profileData?.id}' method='POST'>
//                 <section>
//                   <button disabled type='submit' role='link'>
//                     Free
//                   </button>
//                 </section>
//                 <style jsx>
//                   {`
//                     section {
//                       display: flex;
//                       flex-direction: column;
//                       border-radius: 6px;
//                       justify-content: space-between;
//                     }
//                     button {
//                       margin-top: 8px;
//                       height: 36px;
//                       hover: none;
//                       cursor: none;
//                       background: gray;
//                       border-radius: 4px;
//                       color: white;
//                       border: 0;
//                       font-weight: 600;
//                       cursor: pointer;
//                       transition: all 0.5s ease;
//                       box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
//                     }
//                     button:hover {
//                       opacity: 0.8;
//                     }
//                   `}
//                 </style>
//               </form>
//             </div> */}
//       </div>
//       {/* <div
//           style={{
//             margin: "16px auto",
//             width: "30%",
//             backgroundColor: "#f5f5f5",
//             borderRadius: 8,
//             minWidth: 200,
//             boxShadow: "5px 5px 10px gray",
//           }}
//         >
//           <div style={{ padding: 8 }}>
//             <h3 className={nunito.className}>Standard Pa</h3>
//             <hr />
//             <h3 className={nunito.className}>$9.99</h3>
//             <hr />
//             <h4>2,000 credits</h4>
//             <p className={nunito.className}>
//               Questions and image uploads cost 1 credit
//             </p>
//             <p className={nunito.className}>
//               Usable on any current/future AI bots
//             </p>
//             <form
//               action={`/api/checkout_sessions?user_id=${profileData?.id}`}
//               method="POST"
//             >
//               <section>
//                 <button type="submit" role="link">
//                   Buy Now
//                 </button>
//               </section>
//               <style jsx>
//                 {`
//                   section {
//                     display: flex;
//                     flex-direction: column;
//                     border-radius: 6px;
//                     justify-content: space-between;
//                   }
//                   button {
//                     margin-top: 8px;
//                     height: 36px;
//                     background: #556cd6;
//                     border-radius: 4px;
//                     color: white;
//                     border: 0;
//                     font-weight: 600;
//                     cursor: pointer;
//                     transition: all 0.5s ease;
//                     box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
//                   }
//                   button:hover {
//                     opacity: 0.8;
//                   }
//                 `}
//               </style>
//             </form>
//           </div>
//         </div> */}

//       {profileData?.subscribed ? (
//         <div
//           style={{
//             margin: "16px auto",
//             width: "30%",
//             backgroundColor: "#f5f5f5",
//             borderRadius: 8,
//             minWidth: 200,
//             boxShadow: "5px 5px 10px gray",
//           }}
//         >
//           <div style={{ padding: 8 }}>
//             <h3 className={nunito.className}>You are subscribed!</h3>
//             <hr />
//             <h3 className={nunito.className}>$9.99 / Month</h3>
//             <hr />
//             <h4>
//               If you want to cancel your subscription - please email
//               support@oddityai.com and include your accounts email address.
//             </h4>
//             {/* <p className={nunito.className}>Enough for a few months</p> */}
//             <p className={nunito.className}>
//               We are working on a self-cancel, it will be available soon.
//             </p>
//           </div>
//         </div>
//       ) : (
//         <div
//           style={{
//             margin: "16px auto",
//             width: "30%",
//             backgroundColor: "#f5f5f5",
//             borderRadius: 8,
//             minWidth: 200,
//             boxShadow: "5px 5px 10px gray",
//           }}
//         >
//           <div style={{ padding: 8 }}>
//             <h3 className={nunito.className}>Unlimited Questions</h3>
//             <hr />
//             <h3 className={nunito.className}>$9.99</h3>
//             <hr />
//             <h4>30 Day Subscription</h4>
//             {/* <p className={nunito.className}>Enough for a few months</p> */}
//             <p className={nunito.className}>
//               Get unlimited questions every month until you cancel.
//             </p>
//             <p className={nunito.className}>
//               Usable on any current/future AI bots
//             </p>
//             <form
//               action={`/api/checkout_session_subscribe?user_id=${profileData?.id}`}
//               method="POST"
//             >
//               <section>
//                 <button type="submit" role="link">
//                   Subscribe Now
//                 </button>
//               </section>
//               <style jsx>
//                 {`
//                   section {
//                     display: flex;
//                     flex-direction: column;
//                     border-radius: 6px;
//                     justify-content: space-between;
//                   }
//                   button {
//                     margin-top: 8px;
//                     height: 36px;
//                     background: #556cd6;
//                     border-radius: 4px;
//                     color: white;
//                     border: 0;
//                     font-weight: 600;
//                     cursor: pointer;
//                     transition: all 0.5s ease;
//                     box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
//                   }
//                   button:hover {
//                     opacity: 0.8;
//                   }
//                 `}
//               </style>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* <div
//           style={{
//             margin: '16px auto',
//             width: '30%',
//             backgroundColor: '#f5f5f5',
//             borderRadius: 8,
//             minWidth: 200,
//             boxShadow: '5px 5px 10px gray',
//           }}
//         >
//           <div style={{ padding: 8 }}>
//             <h3 className={nunito.className}>Mega Pack</h3>
//             <sup style={{ color: 'red', fontSize: '0.8rem' }}>Best Value!</sup>

//             <hr />
//             <h3 className={nunito.className}>$19.99</h3>
//             <hr />
//             <h4>1800 credits</h4>
//             {/* <p className={nunito.className}>Enough for a few months</p>
//             <p className={nunito.className}>
//               Questions and image uploads cost 1 credit
//             </p>
//             <p className={nunito.className}>
//               Usable on any current/future AI bots
//             </p>
//             <form action={`/api/checkout_sessions3?user_id=${profileData?.id}`} method='POST'>
//               <section>
//                 <button type='submit' role='link'>
//                   Buy Now
//                 </button>
//               </section>
//               <style jsx>
//                 {`
//                   section {
//                     display: flex;
//                     flex-direction: column;
//                     border-radius: 6px;
//                     justify-content: space-between;
//                   }
//                   button {
//                     margin-top: 8px;
//                     height: 36px;
//                     background: #556cd6;
//                     border-radius: 4px;
//                     color: white;
//                     border: 0;
//                     font-weight: 600;
//                     cursor: pointer;
//                     transition: all 0.5s ease;
//                     box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
//                   }
//                   button:hover {
//                     opacity: 0.8;
//                   }
//                 `}
//               </style>
//             </form>
//           </div>
//         </div> */}
//       {/* {profileData && profileData.duplicate != true && (
//           <div
//             style={{
//               width: '75%',
//               margin: '16px auto',
//               backgroundColor: '#f5f5f5',
//               borderRadius: 8,
//               minWidth: 200,
//               boxShadow: '5px 5px 10px gray',
//             }}
//           >
//             {' '}
//             <div
//               style={{
//                 backgroundColor: '#f5f5f5',
//                 borderRadius: 8,
//               }}
//             >
//               <div style={{ padding: 8 }}>
//                 <h2
//                   className={nunito.className}
//                   style={{ fontSize: 22, color: '#ff6f00' }}
//                 >
//                   Get 100 free credits for inviting your friends!
//                 </h2>
//                 <h3 className={nunito.className}>
//                   If someone signs up and uses your referral code, you both get
//                   100 extra credits for free.
//                 </h3>
//                 <h3 className={nunito.className}>
//                   Your referral code is: <br />
//                   <span style={{ color: '#24b557' }}>
//                     {profileData?.referralCode}
//                   </span>
//                 </h3>
//               </div>
//             </div>
//             <div
//               style={{
//                 backgroundColor: '#f5f5f5',
//                 borderRadius: 8,
//                 marginTop: 16,
//               }}
//             >
//               <div style={{ padding: 8 }} id='refcode'>
//                 <h3 className={nunito.className}>
//                   Have a referral code? <br /> Enter it below to get 100 credits
//                   instantly!
//                 </h3>
//                 <div
//                   style={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}
//                 >
//                   <TextField
//                     style={{
//                       width: 150,
//                       fontSize: 14,
//                       border: 'none',
//                       marginLeft: 10,
//                       backgroundColor: 'white',
//                       marginTop: 10,
//                       marginBottom: 10,
//                     }}
//                     value={referralCode}
//                     onChange={(e) => setReferralCode(e.target.value)}
//                     placeholder='Referral code'
//                   />
//                   {referralCode != profileData?.referralCode ? (
//                     <Button
//                       onClick={handleSubmitReferralCode}
//                       style={{
//                         zIndex: 10,
//                         backgroundColor: '#ff4a47',
//                         padding: 14,
//                         textTransform: 'none',
//                         marginLeft: 8,
//                         color: 'white',
//                         width: 150,
//                         height: 50,
//                       }}
//                     >
//                       Get free credits!
//                     </Button>
//                   ) : (
//                     <Button
//                       style={{
//                         zIndex: 10,
//                         backgroundColor: '#ff4a47',
//                         padding: 14,
//                         textTransform: 'none',
//                         marginLeft: 8,
//                         color: 'white',
//                         width: 150,
//                         height: 50,
//                       }}
//                       disabled
//                     >
//                       Try again!
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )} */}
//       {/* <div
//               style={{
//                 margin: '16px auto',
//                 width: '30%',
//                 backgroundColor: '#f5f5f5',
//                 borderRadius: 8,
//                 minWidth: 200,
//                 boxShadow: '5px 5px 10px gray',
//               }}
//             >
//               <div style={{ padding: 8 }}>
//                 <h3
//                   className={nunito.className}
//                   style={{
//                     scale: '1.5',
//                     textDecoration: 'underline',
//                   }}
//                 >
//                   Best Deal
//                 </h3>
//                 <hr />
//                 <h3 className={nunito.className}>$30 / 1000 credits</h3>
//                 <hr />
//                 <h4>1000 credits</h4>
//                 <p className={nunito.className}>Enough for a year</p>
//                 <p className={nunito.className}>
//                   Usable on any current/future AI bots
//                 </p>
//                 <form
//                   action='/api/checkout_sessions2?user_id=${profileData?.id}'
//                   method='POST'
//                 >
//                   <section>
//                     <button type='submit' role='link'>
//                       Buy Now
//                     </button>
//                   </section>
//                   <style jsx>
//                     {`
//                       section {
//                         display: flex;
//                         flex-direction: column;
//                         border-radius: 6px;
//                         justify-content: space-between;
//                       }
//                       button {
//                         margin-top: 8px;
//                         height: 36px;
//                         background: #556cd6;
//                         border-radius: 4px;
//                         color: white;
//                         border: 0;
//                         font-weight: 600;
//                         cursor: pointer;
//                         transition: all 0.5s ease;
//                         box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
//                       }
//                       button:hover {
//                         opacity: 0.8;
//                       }
//                     `}
//                   </style>
//                 </form>
//               </div>
//             </div> */}
//       {/* </div> */}
//     </>
//   );
// };

// export default PricingPage;
