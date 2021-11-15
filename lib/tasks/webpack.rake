namespace :webpack do
    desc "Compile webpack bundles"
    task(:build) { sh "npm run build --prefix app/javascript/" }
  
    desc "Start webpack dev server"
    task(:start) do
        sh "npm run start --prefix app/javascript/" 
    end

    desc "Install node packages"
    task(:install) { sh "npm install --prefix app/javascript/" }
end