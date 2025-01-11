# This is my template to combine minimal tools used in my SaaS apps.

The front-end is in React + Vite for development
I use Tailwind as CSS utility

Authentication is based on Supabase and its database, if login is successful it is pointing
to an AWS machine through its IP address, where I would put an AI/LLM running code, that's why I call this a wrap: the AI/LLM application is not included. 

The potential payments are through Stripe.

The Vite deployment is ready for production Vercel. I have additional pictures within /public/assets, and the graphical content of the splashpage are not in the main App.js file but imported.

Just two reminders, 
in Node.js the equivalent of requirements.txt for Python is package.json or the associated Vite file.
On Vercel the import of environmental variables might change if we use NextJs, React, or Vite.

```
npm create-react-app
```
and for deploying the production on Vercel 
```
vercel --prod
```
![Summary of the components](https://github.com/alecrimi/wingAI_onlywrap/blob/main/summary.jpg)
