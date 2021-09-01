const jwt = require('jsonwebtoken');

class Token{
    tokenKey = "somekey";
    storagekey = "pop-token";
    bindedKey = null;
    set(ref="",hour=24){
        const token = jwt.sign({email:ref}, `${this.tokenKey}${ref}`, { expiresIn: `${hour}h`});
        try{
            const getToken = this.get();
            if (getToken){
                let tokenList = [];
                for (let tok of getToken) tokenList.push(tok);
                tokenList.push({email:ref, key:token});
                this.save(tokenList);
            }else this.save([token]);
        }catch{
            this.save([{email:ref, key:token}]);
        }
    }
    save(obj){
        window.localStorage.setItem(this.storagekey,JSON.stringify(obj));
    }
    get(){
        const token = window.localStorage.getItem(this.storagekey);
        if (token) return JSON.parse(token);
        return [];
    }
    detete(ref, refToken=null){
        let storeSave = [];
        for (let token of this.get()){
            if (!refToken){
                if (token?.email !== ref) storeSave.push(token);
            }else{
                if (token?.email === ref && token.key !== refToken) storeSave.push(token);
            }
        }
        this.save(storeSave);
    }
    isActive(ref=""){
        try{
            for (let token of this.get()){
                let res = null;
                try{
                    res = jwt.verify(token?.key, `${this.tokenKey}${ref}`);
                    //console.log(res)
                }finally{
                    if (res){
                        if (res.email === ref) return true;
                    }else this.detete(ref, token?.key);
                }
            }
            return false;
        }catch(error){
            console.log(error)
            return false;
        }
    }
    clear(ref="all"){
        if (ref.toLowerCase() === "all") window.localStorage.clear();
        else window.localStorage.removeItem(`${this.tokenKey}${ref}`);
    }
}

export const token = new Token();