SmallHash = {
    decode: function (input, ranges, base) {
        input = bigInt.str2bigInt(input, base.length, base);
        var remainder = bigInt.dup(input); // Allocates enough room for the remainder
        var result = [];
        for (var pos = 0, len = ranges.length; pos < len; pos = pos + 1) {
            bigInt.divide(input, bigInt.int2bigInt(ranges[pos], 32), input, remainder);
            result[pos] = Number(bigInt.bigInt2str(remainder, 10, '0123456789'));
        }
		return result;
    },
	decodeUrl: function(url,lg) {
		var encode_string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_"
		
		var ranges=[[5,501,501,501,501,16,16,16,16,16,16,16,16,16,16, 16,16,16,16,16,16,16,16,16,16, 16,16,16,16,16,16,16,16,16,16],[5, 501, 501, 501, 501, 16, 16, 16, 16, 16, 16, 16, 16, 11, 16, 16, 121, 16, 16, 16, 16, 16, 2, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],[5,501,501,501,501,16,16,16,16,16,16,16,16,11,121,55,16,16,16,16,16,16,11,16,16,16,16,16,16, 16,16,16,16,16,16,16,16,16,16,16,16,16,16,2,16,16,16,16],[5,501,501,501,501,16,16,16,16,16,16,16,16,16,16, 16,16,16,16,16,16,16,16,16,16, 16,16,16,16,16,16,16,16,16,16,16,16,16,16]] // ranges[0 : berserker, 1: embermage, 2: engineer, 3: outlander] index =urlindex -1
		
		var sk=[{"Eviscerate":5,"Howl":13,"Raze":26,"Wolfstrike":8,"Battle Rage":30,"Rupture":17,"Ravage":33,"Blood Hunger":15,"Executioner":22,"Rampage":21,"Frost Breath":9,"Stormclaw":23,"Storm Hatchet":6,"Northern Rage":10,"Iceshield":31,"Permafrost":28,"Glacial Shatter":34,"Cold Steel Mastery":19,"Shatter Storm":25,"Rage Retaliation":14,"Shadow Burst":7,"Wolf Shade":11,"Shadowbind":20,"Savage Rush":27,"Chain Snare":32,"Battle Standard":29,"Wolfpack":12,"Frenzy Mastery":16,"Shred Armor":24,"Red Wolf":18},{"Magma Spear":17,"Magma Mace":9,"Firebombs":6,"Blazing Pillar":15,"Infernal Collapse":21,"Immolation Aura":8,"Firestorm":34,"Charge Mastery":27,"Elemental Attunement":30,"Fire Brand":26,"Icy Blast":12,"Hailstorm":7,"Frost Phase":18,"Elemental Boon":36,"Frost Wave":20,"Ice Prison":35,"Astral Ally":31,"Staff Mastery":28,"Frozen Fate":32,"Ice Brand":25,"Prismatic Bolt":11,"Shocking Burst":14,"Thunder Locus":19,"Arc Beam":10,"Death's Bounty":5,"Shockbolts":33,"Shocking Orb":37,"Prismatic Rift":29,"Wand Chaos":23,"Lightning Brand":24},{"Flame Hammer":38,"Seismic Slam":40,"Ember Hammer":6,"Onslaught":10,"Ember Reach":5,"Storm Burst":47,"Emberquake":7,"Heavy Lifting":27,"Supercharge":39,"Coup de Grace":19,"Healing Bot":17,"Blast Cannon":41,"Spider Mines":33,"Gun Bot":16,"Shock Grenade":35,"Fusillade":37,"Sledgebot":45,"Bulwark":32,"Fire and Spark":24,"Charge Domination":28,"Shield Bash":36,"Forcefield":34,"Overload":9,"Dynamo Field":8,"Tremor":44,"Fire Bash":42,"Immobilization Copter":46,"Sword and Board":25,"Aegis of Fate":21,"Charge Reconstitution":26},{"Rapid Fire":28,"Rune Vault":7,"Chaos Burst":9,"Cursed Daggers":5,"Vortex Hex":37,"Shattering Glaive":32,"Venomous Hail":38,"Long Range Mastery":22,"Shotgonne Mastery":19,"Akimbo":23,"Glaive Throw":14,"Tangling Shot":29,"Glaive Sweep":12,"Sandstorm":15,"Bramble Wall":36,"Burning Leap":6,"Flaming Glaives":31,"Dodge Mastery":16,"Poison Burst":17,"Share the Wealth":27,"Blade Pact":10,"Shadowshot":13,"Bane Breath":8,"Repulsion Hex":30,"Stone Pact":11,"Shadowmantle":33,"Shadowling Brute":35,"Master of the Elements":20,"Shadowling Ammo":25,"Death Ritual":26}]
		
		var className=["berserker","embermage","engineer","outlander"]
		
		var tiers=[["Hunter","Tundra","Shadow"],["Inferno","Frost","Storm"],["Blitz","Construction","Aegis"],["Warfare","Lore","Sigil"]]
		
		if (typeof url == 'string') {
			toonClass=(Number(url.split("#")[0].slice(-1))-1)%4
			tidbiUrl=""
			resu=SmallHash.decode(url.split("#")[1],ranges[toonClass],encode_string)
			if (lg==1) console.log("Str:"+resu[1]+"/Dex:"+resu[2]+"/Foc:"+resu[3]+"/Vit:"+resu[4])
			sumTiers=[0,0,0]
			j=0
			for (i in sk[toonClass]) {
				tidbiUrl+=resu[sk[toonClass][i]].toString(16).toUpperCase()
				if (j%10 == 0) {
					if (lg==1) console.log("\n"+tiers[toonClass][j/10].toUpperCase())
				}
				if (resu[sk[toonClass][i]]>0) {
					if (lg==1) console.log(i+": "+resu[sk[toonClass][i]])
					sumTiers[Math.floor(j/10)]+=resu[sk[toonClass][i]]
				}
				j++
			}
			if (lg==1) console.log("\n"+sumTiers[0]+"/"+sumTiers[1]+"/"+sumTiers[2])
			sum=sumTiers[0]+sumTiers[1]+sumTiers[2]
			if (sum<=100) {
				tidbiUrl="http://tidbi.ru/eng/"+className[toonClass]+".php?lvl="+sum+"&fm=0&skill="+tidbiUrl
			} else {
				tidbiUrl="http://tidbi.ru/eng/"+className[toonClass]+".php?lvl=100&fm="+Math.min(sum-100,32)+"&skill="+tidbiUrl
			}
			tidbiUrl+="&stat="
			for (i=1;i<5;i++) {
				tidbiUrl+=encode_string[Math.floor(resu[i]/52)]+encode_string[resu[i]%52]
			}
			tidbiUrl+="aaaaaaaa"
			return tidbiUrl
		} else { //http://torchlight2armory.com/skill-calc?i=1#euhlqj7t9MclwaMmG07_lKEvd https://web.archive.org/web/20160804075809/http://torchlight2armory.com/skill-calc?i=3#lCnSPid5GeOlHfgwiMwec9X2H1Sqa_4EI8V
			document.body.innerHTML = document.body.innerHTML.replace( /https*(:\/\/web.archive.org\/[0-9a-z\/]*|):\/\/torchlight2armory.com\/skill-calc\?i=[#a-z0-9_\-]*/ig, SmallHash.decodeUrl);
		}
	}
};

/* Big Integer Library v. 5.1 | www.leemon.com */

var bigInt = function () {

    //globals
    var bpe=0;         //bits stored per array element
    var mask=0;        //AND this with an array element to chop it down to bpe bits
    var radix=mask+1;  //equals 2^bpe.  A single 1 bit to the left of the last bit of mask.

    //initialize the global variables
    for (bpe=0; (1<<(bpe+1)) > (1<<bpe); bpe++);  //bpe=number of bits in the mantissa on this platform
    bpe>>=1;                   //bpe=number of bits in one element of the array representing the bigInt
    mask=(1<<bpe)-1;           //AND the mask with an integer to get its bpe least significant bits
    radix=mask+1;              //2^bpe.  a single 1 bit to the left of the first bit of mask

    //the following global variables are scratchpad memory to
    //reduce dynamic memory allocation in the inner loop
    var t=new Array(0);
    var ss=t;       //used in multInt)
    var s6=t;       //used in bigInt2str()


    //is bigInt x negative?
    var negative = function(x) {
        return ((x[x.length-1]>>(bpe-1))&1);
    }


    //is (x << (shift*bpe)) > y?
    //x and y are nonnegative bigInts
    //shift is a nonnegative integer
    var greaterShift = function(x,y,shift) {
        var kx=x.length, ky=y.length;
        k=((kx+shift)<ky) ? (kx+shift) : ky;
        for (i=ky-1-shift; i<kx && i>=0; i++)
            if (x[i]>0)
                return 1; //if there are nonzeros in x to the left of the first column of y, then x is bigger
        for (i=kx-1+shift; i<ky; i++)
            if (y[i]>0)
                return 0; //if there are nonzeros in y to the left of the first column of x, then x is not bigger
        for (i=k-1; i>=shift; i--)
            if      (x[i-shift]>y[i]) return 1;
            else if (x[i-shift]<y[i]) return 0;
        return 0;
    }

    //divide x by y giving quotient q and remainder r.  (q=floor(x/y),  r=x mod y).  All 4 are bigints.
    //x must have at least one leading zero element.
    //y must be nonzero.
    //q and r must be arrays that are exactly the same length as x. (Or q can have more).
    //Must have x.length >= y.length >= 2.
    var divide = function(x,y,q,r) {
        var kx, ky;
        var i,j,y1,y2,c,a,b;
        copy(r,x);
        for (ky=y.length;y[ky-1]==0;ky--); //ky is number of elements in y, not including leading zeros

        //normalize: ensure the most significant element of y has its highest bit set
        b=y[ky-1];
        for (a=0; b; a++)
            b>>=1;
        a=bpe-a;  //a is how many bits to shift so that the high order bit of y is leftmost in its array element
        leftShift(y,a);  //multiply both by 1<<a now, then divide both by that at the end
        leftShift(r,a);

        //Rob Visser discovered a bug: the following line was originally just before the normalization.
        for (kx=r.length;r[kx-1]==0 && kx>ky;kx--); //kx is number of elements in normalized x, not including leading zeros

        copyInt(q,0);                      // q=0
        while (!greaterShift(y,r,kx-ky)) {  // while (leftShift(y,kx-ky) <= r) {
            subShift(r,y,kx-ky);             //   r=r-leftShift(y,kx-ky)
            q[kx-ky]++;                       //   q[kx-ky]++;
        }                                   // }

        for (i=kx-1; i>=ky; i--) {
            if (r[i]==y[ky-1])
                q[i-ky]=mask;
            else
                q[i-ky]=Math.floor((r[i]*radix+r[i-1])/y[ky-1]);

            //The following for(;;) loop is equivalent to the commented while loop,
            //except that the uncommented version avoids overflow.
            //The commented loop comes from HAC, which assumes r[-1]==y[-1]==0
            //  while (q[i-ky]*(y[ky-1]*radix+y[ky-2]) > r[i]*radix*radix+r[i-1]*radix+r[i-2])
            //    q[i-ky]--;
            for (;;) {
                y2=(ky>1 ? y[ky-2] : 0)*q[i-ky];
                c=y2>>bpe;
                y2=y2 & mask;
                y1=c+q[i-ky]*y[ky-1];
                c=y1>>bpe;
                y1=y1 & mask;

                if (c==r[i] ? y1==r[i-1] ? y2>(i>1 ? r[i-2] : 0) : y1>r[i-1] : c>r[i])
                    q[i-ky]--;
                else
                    break;
            }

            linCombShift(r,y,-q[i-ky],i-ky);    //r=r-q[i-ky]*leftShift(y,i-ky)
            if (negative(r)) {
                addShift(r,y,i-ky);         //r=r+leftShift(y,i-ky)
                q[i-ky]--;
            }
        }

        rightShift(y,a);  //undo the normalization step
        rightShift(r,a);  //undo the normalization step
    }

    //convert the integer t into a bigInt with at least the given number of bits.
    //the returned array stores the bigInt in bpe-bit chunks, little endian (buff[0] is least significant word)
    //Pad the array with leading zeros so that it has at least minSize elements.
    //There will always be at least one leading 0 element.
    var int2bigInt = function(t,bits,minSize) {
        var i,k;
        k=Math.ceil(bits/bpe)+1;
        k=minSize>k ? minSize : k;
        buff=new Array(k);
        copyInt(buff,t);
        return buff;
    }

    //return the bigInt given a string representation in a given base.
    //Pad the array with leading zeros so that it has at least minSize elements.
    //If base=-1, then it reads in a space-separated list of array elements in decimal.
    //The array will always have at least one leading zero, unless base=-1.
    var str2bigInt = function(s,base,digitsStr,minSize) {
        var d, i, j, x, y, kk;
        var k=s.length;
        if (base==-1) { //comma-separated list of array elements in decimal
            x=new Array(0);
            for (;;) {
                y=new Array(x.length+1);
                for (i=0;i<x.length;i++)
                    y[i+1]=x[i];
                y[0]=parseInt(s,10);
                x=y;
                d=s.indexOf(',',0);
                if (d<1)
                    break;
                s=s.substring(d+1);
                if (s.length==0)
                    break;
            }
            if (x.length<minSize) {
                y=new Array(minSize);
                copy(y,x);
                return y;
            }
            return x;
        }

        x=int2bigInt(0,base*k,0);
        for (i=0;i<k;i++) {
            d=digitsStr.indexOf(s.substring(i,i+1),0);
            if (base<=36 && d>=36)  //convert lowercase to uppercase if base<=36
                d-=26;
            if (d<base && d>=0) {   //ignore illegal characters
                multInt(x,base);
                addInt(x,d);
            }
        }

        for (k=x.length;k>0 && !x[k-1];k--); //strip off leading zeros
        k=minSize>k+1 ? minSize : k+1;
        y=new Array(k);
        kk=k<x.length ? k : x.length;
        for (i=0;i<kk;i++)
            y[i]=x[i];
        for (;i<k;i++)
            y[i]=0;
        return y;
    }

    //is the bigInt x equal to zero?
    var isZero = function(x) {
        var i;
        for (i=0;i<x.length;i++)
            if (x[i])
                return 0;
        return 1;
    }

    //convert a bigInt into a string in a given base, from base 2 up to base 95.
    //Base -1 prints the contents of the array representing the number.
    var bigInt2str = function(x,base,digitsStr) {
        var i,t,s="";

        if (s6.length!=x.length)
            s6=dup(x);
        else
            copy(s6,x);

        if (base==-1) { //return the list of array contents
            for (i=x.length-1;i>0;i--)
                s+=x[i]+',';
            s+=x[0];
        }
        else { //return it in the given base
            while (!isZero(s6)) {
                t=divInt(s6,base);  //t=s6 % base; s6=floor(s6/base);
                s=digitsStr.substring(t,t+1)+s;
            }
        }
        if (s.length==0)
            s="";
        return s;
    }

    //returns a duplicate of bigInt x
    var dup = function(x) {
        var i;
        buff=new Array(x.length);
        copy(buff,x);
        return buff;
    }

    //do x=y on bigInts x and y.  x must be an array at least as big as y (not counting the leading zeros in y).
    var copy = function(x,y) {
        var i;
        var k=x.length<y.length ? x.length : y.length;
        for (i=0;i<k;i++)
            x[i]=y[i];
        for (i=k;i<x.length;i++)
            x[i]=0;
    }

    //do x=y on bigInt x and integer y.
    var copyInt = function(x,n) {
        var i,c;
        for (c=n,i=0;i<x.length;i++) {
            x[i]=c & mask;
            c>>=bpe;
        }
    }

    //do x=x+n where x is a bigInt and n is an integer.
    //x must be large enough to hold the result.
    var addInt = function(x,n) {
        var i,k,c,b;
        x[0]+=n;
        k=x.length;
        c=0;
        for (i=0;i<k;i++) {
            c+=x[i];
            b=0;
            if (c<0) {
                b=-(c>>bpe);
                c+=b*radix;
            }
            x[i]=c & mask;
            c=(c>>bpe)-b;
            if (!c) return; //stop carrying as soon as the carry_ is zero
        }
    }

    //right shift bigInt x by n bits.  0 <= n < bpe.
    var rightShift = function(x,n) {
        var i;
        var k=Math.floor(n/bpe);
        if (k) {
            for (i=0;i<x.length-k;i++) //right shift x by k elements
                x[i]=x[i+k];
            for (;i<x.length;i++)
                x[i]=0;
            n%=bpe;
        }
        for (i=0;i<x.length-1;i++) {
            x[i]=mask & ((x[i+1]<<(bpe-n)) | (x[i]>>n));
        }
        x[i]>>=n;
    }

    //left shift bigInt x by n bits.
    var leftShift = function(x,n) {
        var i;
        var k=Math.floor(n/bpe);
        if (k) {
            for (i=x.length; i>=k; i--) //left shift x by k elements
                x[i]=x[i-k];
            for (;i>=0;i--)
                x[i]=0;
            n%=bpe;
        }
        if (!n)
            return;
        for (i=x.length-1;i>0;i--) {
            x[i]=mask & ((x[i]<<n) | (x[i-1]>>(bpe-n)));
        }
        x[i]=mask & (x[i]<<n);
    }

    //do x=x*n where x is a bigInt and n is an integer.
    //x must be large enough to hold the result.
    var multInt = function(x,n) {
        var i,k,c,b;
        if (!n)
            return;
        k=x.length;
        c=0;
        for (i=0;i<k;i++) {
            c+=x[i]*n;
            b=0;
            if (c<0) {
                b=-(c>>bpe);
                c+=b*radix;
            }
            x[i]=c & mask;
            c=(c>>bpe)-b;
        }
    }

    //do x=floor(x/n) for bigInt x and integer n, and return the remainder
    var divInt = function(x,n) {
            var i,r=0,s;
            for (i=x.length-1;i>=0;i--) {
                s=r*radix+x[i];
                x[i]=Math.floor(s/n);
                r=s%n;
            }
            return r;
    }

    //do the linear combination x=a*x+b*(y<<(ys*bpe)) for bigInts x and y, and integers a, b and ys.
    //x must be large enough to hold the answer.
    var linCombShift = function(x,y,b,ys) {
        var i,c,k,kk;
        k=x.length<ys+y.length ? x.length : ys+y.length;
        kk=x.length;
        for (c=0,i=ys;i<k;i++) {
            c+=x[i]+b*y[i-ys];
            x[i]=c & mask;
            c>>=bpe;
        }
        for (i=k;c && i<kk;i++) {
            c+=x[i];
            x[i]=c & mask;
            c>>=bpe;
        }
    }

    //do x=x+(y<<(ys*bpe)) for bigInts x and y, and integers a,b and ys.
    //x must be large enough to hold the answer.
    var addShift = function(x,y,ys) {
        var i,c,k,kk;
        k=x.length<ys+y.length ? x.length : ys+y.length;
        kk=x.length;
        for (c=0,i=ys;i<k;i++) {
            c+=x[i]+y[i-ys];
            x[i]=c & mask;
            c>>=bpe;
        }
        for (i=k;c && i<kk;i++) {
            c+=x[i];
            x[i]=c & mask;
            c>>=bpe;
        }
    }

    //do x=x-(y<<(ys*bpe)) for bigInts x and y, and integers a,b and ys.
    //x must be large enough to hold the answer.
    var subShift = function(x,y,ys) {
        var i,c,k,kk;
        k=x.length<ys+y.length ? x.length : ys+y.length;
        kk=x.length;
        for (c=0,i=ys;i<k;i++) {
            c+=x[i]-y[i-ys];
            x[i]=c & mask;
            c>>=bpe;
        }
        for (i=k;c && i<kk;i++) {
            c+=x[i];
            x[i]=c & mask;
            c>>=bpe;
        }
    }

    //do x=x-y for bigInts x and y.
    //x must be large enough to hold the answer.
    //negative answers will be 2s complement
    var sub = function(x,y) {
        var i,c,k,kk;
        k=x.length<y.length ? x.length : y.length;
        for (c=0,i=0;i<k;i++) {
            c+=x[i]-y[i];
            x[i]=c & mask;
            c>>=bpe;
        }
        for (i=k;c && i<x.length;i++) {
            c+=x[i];
            x[i]=c & mask;
            c>>=bpe;
        }
    }

    //do x=x+y for bigInts x and y.
    //x must be large enough to hold the answer.
    var add = function(x,y) {
        var i,c,k,kk;
        k=x.length<y.length ? x.length : y.length;
        for (c=0,i=0;i<k;i++) {
            c+=x[i]+y[i];
            x[i]=c & mask;
            c>>=bpe;
        }
        for (i=k;c && i<x.length;i++) {
            c+=x[i];
            x[i]=c & mask;
            c>>=bpe;
        }
    }

    //do x=x*y for bigInts x and y.  This is faster when y<x.
    var mult = function(x,y) {
        var i;
        if (ss.length!=2*x.length)
            ss=new Array(2*x.length);
        copyInt(ss,0);
        for (i=0;i<y.length;i++)
            if (y[i])
                linCombShift(ss,x,y[i],i);   //ss=1*ss+y[i]*(x<<(i*bpe))
        copy(x,ss);
    }

    return {
        int2bigInt: int2bigInt,
        mult: mult,
        add: add,
        divide: divide,
        bigInt2str: bigInt2str,
        str2bigInt: str2bigInt,
        dup: dup
    };

}();

window.onload=SmallHash.decodeUrl
if (document.readyState=="complete") SmallHash.decodeUrl()