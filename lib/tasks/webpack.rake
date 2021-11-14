namespace :webpack do
    desc "Compile webpack bundles"
    task(:build) { sh "npm run build --prefix app/javascript/" }
  
    desc "Start webpack dev server"
    task(:start) { sh "npm run start --prefix app/javascript/" }

    desc "Install node packages"
    task(:install) { sh "npm install --prefix app/javascript/" }
end